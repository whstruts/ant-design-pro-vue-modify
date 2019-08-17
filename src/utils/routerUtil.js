/**
 * 提取路由的name值到一个数组中
 * @param routeArr 路由信息集合
 * @return {Array} 路由name数组
 */
export function extractRouterName (routeArr) {
  let routeNameArr = []
  for (const routerInfo of routeArr) {
    if (routerInfo.name) {
      routeNameArr.push(routerInfo.name)
    }
    if (routerInfo.children && routerInfo.children.length > 0) {
      // 递归获取子路由的name
      const childrenRouteNameArr = extractRouterName(routerInfo.children)
      routeNameArr = [...routeNameArr, ...childrenRouteNameArr]
    }
  }
  return routeNameArr
}
