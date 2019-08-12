/**
 * 判断是否拥有菜单权限
 * @param {Array<String>> | string | undefined | null} currentRoutePermissions 路由定义的meate.permission
 * @param {Array<String>>} currentUserMenuPermissions 用于拥有的菜单权限
 */
export default function hasMenuPermission (currentRoutePermissions, currentUserMenuPermissions) {
  if (currentRoutePermissions) {
    if (!currentUserMenuPermissions) {
      // 当前用户没有任何权限
      return false
    }
    if (typeof (currentRoutePermissions) === 'string') {
      // 当前路由有设置mate.permission属性值,且类型为字符串
      for (const menuPermission of currentUserMenuPermissions) {
        if (currentRoutePermissions === menuPermission) {
          return true
        }
      }
      return false
    } else {
      // 当前路由有设置mate.permission属性值,且类型为数组
      for (const userMenuPermission of currentUserMenuPermissions) {
        for (const routerMenuPermission of currentRoutePermissions) {
          if (routerMenuPermission === userMenuPermission) {
            return true
          }
        }
      }
      return false
    }
  } else {
    return true
  }
}
