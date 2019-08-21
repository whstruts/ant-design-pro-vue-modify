<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome }}</span></div>
      <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
    </div>

    <div>
      <a-row :gutter="16" style="margin-bottom: 23px">
        <a-col class="gutter-row" :sm="24" :md="12" :xl="8">
          <a-button block>修改密码</a-button>
        </a-col>
        <a-col class="gutter-row" :sm="24" :md="12" :xl="8">
          <a-button block>账户信息</a-button>
        </a-col>
        <a-col class="gutter-row" :sm="24" :md="12" :xl="8">
          <a-button block>退出</a-button>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            style="margin-bottom: 24px;"
            :bordered="false"
            :body-style="{ padding: 0 }">
            <a-calendar :fullscreen="false"/>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="时间" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div style="font-size: 20px;text-align: center;margin-top:15px;margin-bottom: 15px;">{{ dateTime }}</div>
          </a-card>
          <a-card title="最近登录" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div style="margin:20px;">
              <div>
                <strong>系统:</strong><span>Mac OSX</span>
              </div>
              <div>
                <strong>浏览器:</strong><span>Chorme</span>
              </div>
              <div>
                <strong>时间:</strong><span>2019-08-15 19:00</span>
              </div>
              <div>
                <strong>IP:</strong><span>192.186.1.1</span>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'

import { PageView } from '@/layouts/index'
import HeadInfo from '@/components/tools/HeadInfo'
import { Radar } from '@/components/index'

import WinterUtil from '@/utils/WinterUtil'

const { dateFormat } = WinterUtil

export default {
  name: 'Welcome',
  components: {
    PageView,
    HeadInfo,
    Radar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},

      loading: true,
      dateTime: dateFormat(new Date(), 'yyyy-MM-dd HH:mm'),
      clearInterval: null
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
    const _this = this
    if (!this.clearInterval) {
      this.clearInterval = setInterval(() => {
        _this.dateTime = dateFormat(new Date(), 'yyyy-MM-dd HH:mm')
      }, 10000)
    }
  },
  deactivated () {
    if (this.clearInterval) {
      clearInterval(this.clearInterval)
      this.clearInterval = null
    }
  },
  destroyed () {
    if (this.clearInterval) {
      clearInterval(this.clearInterval)
      this.clearInterval = null
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
