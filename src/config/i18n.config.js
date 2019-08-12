import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { loadI18nLocale } from '@/utils/i18nUtil'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: loadI18nLocale(),
  silentTranslationWarn: true, // 没有的key值不发出警告
  missing (locale, code) { // 没有key值时应如何处理
    // console.log(`--> i18n编码[${locale}]未找到对应区域语言[${code}]的数据`)
    return code
  }
})

export default i18n
