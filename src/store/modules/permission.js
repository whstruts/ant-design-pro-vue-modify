import { asyncRouterMap, constantRouterMap } from '@/config/router.config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole (roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter (routerMap, menuPermissionList) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(menuPermissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menuPermissionList)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { menuPermissionList } = data
        // TODO 第 4 步: 动态路由构造改造点: 根据权限动态构造路由, 如果您不需要动态路由, 则直接 commit('SET_ROUTERS', asyncRouterMap)
        console.log('前端定义的路由:', asyncRouterMap)
        // 将用户拥有的菜单权限与前端定义的路由进行过滤, 构建出适合该用户的动态路由
        const accessedRouters = filterAsyncRouter(asyncRouterMap, menuPermissionList)
        console.log('用户可访问的路由:', accessedRouters)
        // 保存构建的动态路由
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
