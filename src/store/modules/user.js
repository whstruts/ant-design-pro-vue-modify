import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    funPermissions: [],
    routerPermissions: [],
    // 菜单树数据
    menuTree: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_FUN_PERMISSIONS: (state, funPermissions) => {
      state.funPermissions = funPermissions
    },
    SET_ROUTER_PERMISSIONS: (state, routerPermissions) => {
      state.routerPermissions = routerPermissions
    },
    SET_MENU_TREE (state, menuTree) {
      state.menuTree = menuTree
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // TODO 第 1 步: 登录改造点: 将登录地址改为自己的登录地址, 将返回结果改为自己的返回结果
        login(userInfo).then(response => {
          const result = response
          // token只用于前端验证是否登录, 也可以直接将id或者其它什么东西放入(只在[src/permission.js]中,以及当前文件的Logout方法中有用到)
          const token = userInfo.username === 'admin' ? '7758258' : '666666'
          Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', token)
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        // TODO 第 2 步: 获取用户权限信息改造点: 将地址改为自己的请求地址
        const admin = Vue.ls.get(ACCESS_TOKEN) === '7758258'
        console.log('是否超管:' + admin)
        getInfo(admin).then(response => {
          const result = response

          commit('SET_ROLES', result.roleList)
          // 设置功能权限
          commit('SET_FUN_PERMISSIONS', result.funPermissionList)
          // 设置路由权限
          commit('SET_ROUTER_PERMISSIONS', result.menuPermissionList)
          // 设置用户菜单
          commit('SET_MENU_TREE', result.menuTree)
          // 设置用户信息
          commit('SET_INFO', result)

          // 用户姓名
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          // 用户图片
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      // TODO 最后一步: 登出改造点
      return new Promise((resolve) => {
        // 清除store中的已登录标识
        commit('SET_TOKEN', '')
        // 清除用户拥有的角色信息
        commit('SET_ROLES', [])
        // 清除用户拥有的功能权限信息
        commit('SET_FUN_PERMISSIONS', [])
        // 清除用户拥有的拥有权限信息
        commit('SET_ROUTER_PERMISSIONS', [])
        // 清除用户拥有的菜单信息
        commit('SET_MENU_TREE', [])
        // 清除用户信息
        commit('SET_INFO', {})
        // 清除已登录标识
        Vue.ls.remove(ACCESS_TOKEN)

        resolve()
        // logout(state.token).then(() => {
        //   resolve()
        // }).catch(() => {
        //   resolve()
        // })
      })
    }

  }
}

export default user
