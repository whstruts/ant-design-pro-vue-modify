import Vue from 'vue'
import store from '@/store'
import hasMenuPermission from '@/utils/hasMenuPermission'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */
const action = Vue.directive('action', {
  inserted: function (el, binding, vnode) {
    // TODO 第 5 步: 自定义鉴权指令改造点: 根据自己的数据结构特点, 改造鉴权逻辑
    // 获取当前需要鉴权的操作标识值
    const actionName = binding.arg
    // 获取当前用户的所有功能权限
    const funPermissions = store.getters.funPermissions
    // 获取当前用户的所有菜单权限
    const menuPermissions = store.getters.routerPermissions
    // 获取当前路由的`meta.permission`值
    const elVal = vnode.context.$route.meta.permission
    const permissionId = elVal instanceof String && [elVal] || elVal
    // 判断是否拥有操作权限
    let hasFunPermission = false
    if (permissionId) {
      // 菜单权限鉴定
      if (hasMenuPermission(permissionId, menuPermissions)) {
        // 功能权限鉴定
        if (funPermissions && funPermissions.length > 0 && funPermissions.includes(actionName)) {
          hasFunPermission = true
        }
      }
    } else {
      // 功能权限鉴定
      if (funPermissions && funPermissions.length > 0 && funPermissions.includes(actionName)) {
        hasFunPermission = true
      }
    }
    if (!hasFunPermission) {
      // 没有对应操作权限, 则删除或隐藏元素
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})

export default action
