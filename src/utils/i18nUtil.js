import Vue from 'vue'
import WinterUtil from '@/utils/WinterUtil'

const I18N_LOCALE_KEY = 'i18n-locale'

/**
 * 获取存储在本地的区域语言标识, 如果不存在则返回默认值
 * @return {*}
 */
export function loadI18nLocale () {
  let i18nLocale = WinterUtil.getJsSessionItem(I18N_LOCALE_KEY)
  if (WinterUtil.strIsBlank(i18nLocale)) {
    i18nLocale = 'zh_CN'
  }
  return i18nLocale
}

/**
 * 设置本地的区域语言标识
 * @param {string} locale 区域语言标识
 */
export function setI18nLocale (locale) {
  WinterUtil.setJsSessionItem(I18N_LOCALE_KEY, locale)
}
