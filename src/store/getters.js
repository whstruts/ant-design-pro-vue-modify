const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  funPermissions: state => state.user.funPermissions,
  routerPermissions: state => state.user.routerPermissions,
  menuTree: state => state.user.menuTree,
  // 是否已执行过从后台加载用户权限信息的web api
  executedLoadPermissionFromBackend: state => state.user.executedLoadPermissionFromBackend
}

export default getters
