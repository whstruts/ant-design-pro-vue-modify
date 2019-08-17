// 标准的web api数据结构解析帮助类

export default {
  /**
   * 默认分页大小
   */
  size: 10,
  /**
   * 默认页号
   */
  page: 1,

  /**
   * 提取实际的响应数据
   * @param apiResponse
   * @return {*} 当前的业务数据
   */
  extractResponseData: (apiResponse) => {
    return apiResponse.dataContent
  },

  /**
   * 验证web api是否执行成功
   * @param apiResponse web api的标准响应结果
   * @return {boolean} true表示成功, false表示失败
   */
  validateApiExecuteSuc: (apiResponse) => {
    return apiResponse.code === '0'
  },

  /**
   * 获取api的错误提示信息
   * @param apiResponse web api的标准响应结果
   * @return {boolean} true表示成功, false表示失败
   */
  extractApiExecuteErrorMsg: (apiResponse) => {
    return apiResponse.errorMsg
  }

}
