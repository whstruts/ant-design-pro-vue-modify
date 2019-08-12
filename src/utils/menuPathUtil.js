/**
 * 判断菜单的path是否为外部链接
 */
export default function menuPathIsExternalLinks (path) {
  let result = false
  if (path) {
    if (path.toLowerCase().startsWith('https://') || path.toLowerCase().startsWith('http://')) {
      result = true
    }
  }
  return result
}
