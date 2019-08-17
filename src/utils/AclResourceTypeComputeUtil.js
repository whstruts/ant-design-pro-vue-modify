/**
 * 判断指定资源标识是否为超管类型资源
 * @param resourceFlag
 * @return {*}
 */
export function isAdminResource (resourceFlag) {
  return computePosN1(resourceFlag, 1)
}

/**
 * 判断指定资源标识是否为人员类型资源
 * @param resourceFlag
 * @return {*}
 */
export function isPersonResource (resourceFlag) {
  return computePosN1(resourceFlag, 2)
}

/**
 * 判断指定资源标识是否为人员类型资源
 * @param resourceFlag
 * @return {*}
 */
export function isCompanyAdminResource (resourceFlag) {
  return computePosN1(resourceFlag, 3)
}

/**
 * 计算数值num从右往左的pos位(二进制位数)是否为1
 * @param num 数值
 * @param pos 位数
 * @return {boolean}
 */
export function computePosN1 (num, pos) {
  return (1 << (pos - 1) & num) > 0
}
