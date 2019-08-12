import { axios } from '@/utils/request'

/**
 * 获取语言列表数据
 * @returns {Promise}
 */
export function loadLanguageList$ () {
  return axios({
    url: '/mock-api/language-list.json',
    method: 'get'
  })
}

/**
 *
 * 按照语言编码获取语言数据
 * @param languageCode 语言编码
 * @returns {*}
 */
export function loadLanguageData$ ({ languageCode }) {
  return axios({
    url: `/mock-api/language-data-${languageCode}.json`,
    method: 'get'
  })
}
