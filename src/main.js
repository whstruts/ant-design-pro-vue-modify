// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/dracula.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

import i18n from './config/i18n.config'

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(VueHighlightJS)
// use
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
