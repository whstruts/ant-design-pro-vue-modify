import store from '@/store'
import hasMenuPermission from '@/utils/hasMenuPermission'

const PERMISSION_ENUM = {
  'add': { key: 'add', label: '新增' },
  'delete': { key: 'delete', label: '删除' },
  'edit': { key: 'edit', label: '修改' },
  'query': { key: 'query', label: '查询' },
  'get': { key: 'get', label: '详情' },
  'enable': { key: 'enable', label: '启用' },
  'disable': { key: 'disable', label: '禁用' },
  'import': { key: 'import', label: '导入' },
  'export': { key: 'export', label: '导出' }
}

function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        /*
         *  funPermission: 必填. 类型为:字符串
         *  menuPermission: 可选. 类型为:字符串或数组. 如果有值,则必须同时拥有菜单权限和功能权限
         */
        return (funPermission, menuPermission) => {
          // TODO 第 6 步: 自定义鉴权指令改造点: 根据自己的数据结构特点, 改造鉴权逻辑. 需要跟action.js那边保持一致
          // 获取当前用户的所有功能权限
          const funPermissionList = store.getters.funPermissions
          // 获取当前用户的所有菜单权限
          const userMenuPermissions = store.getters.routerPermissions
          if (menuPermission) {
            if (hasMenuPermission(menuPermission, userMenuPermissions)) {
              return funPermissionList.find((val) => {
                return val === funPermission
              }) !== undefined
            } else {
              return false
            }
          } else {
            return funPermissionList.find((val) => {
              return val === funPermission
            }) !== undefined
          }
        }
      }
    }
  })

  !Vue.prototype.$enum && Object.defineProperties(Vue.prototype, {
    $enum: {
      get () {
        // const _this = this;
        return (val) => {
          let result = PERMISSION_ENUM
          val && val.split('.').forEach(v => {
            result = result && result[v] || null
          })
          return result
        }
      }
    }
  })
}

export default plugin
