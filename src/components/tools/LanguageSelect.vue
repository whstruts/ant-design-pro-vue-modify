<template>
  <a-dropdown>
    <span class="action ant-dropdown-link user-dropdown-menu">
      <a-icon type="global"/>
    </span>
    <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
      <a-menu-item v-for="(item,idx) in languageList" :key="idx" @click="handleLanguageChange(item.code)">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapActions } from 'vuex'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import moment from 'moment'
import { loadI18nLocale, setI18nLocale } from '@/utils/i18nUtil'

export default {
  name: 'LanguageSelect',
  components: {},
  created () {
    this.loadLanguageList()
    const _this = this
    const localeKey = loadI18nLocale()
    this.changeLanguage(localeKey).then(() => {
      _this.setBrowserTabTitle(_this.$route)
    })
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.setBrowserTabTitle(val)
      },
      // 深度观察监听
      deep: false
    }
  },
  methods: {
    ...mapActions('language', ['loadLanguageList', 'loadLanguageData']),
    setBrowserTabTitle (routeInfo) {
      if (routeInfo && routeInfo.meta && routeInfo.meta.title && routeInfo.meta.title !== '') {
        setDocumentTitle(this.$t(routeInfo.meta.title) + ' - ' + domTitle)
      }
    },
    async changeLanguage (selectedLanguage) {
      this.locale = selectedLanguage
      moment.locale(selectedLanguage)
      const res = await this.loadLanguageData({ selectedLanguage })
      this.$i18n.locale = selectedLanguage
      // TODO 此处将后端的国际化资源放入i18n插件中
      this.$i18n.setLocaleMessage(selectedLanguage, res)
    },
    handleLanguageChange (selectedLanguage) {
      const _this = this
      setI18nLocale(selectedLanguage)
      this.changeLanguage(selectedLanguage).then(() => {
        _this.setBrowserTabTitle(_this.$route)
      })
    }
  },
  computed: {
    selectedLanguage () {
      return this.$store.state.language.selectedLanguage
    },
    languageList () {
      return this.$store.state.language.languageList
    }
  }
}
</script>
