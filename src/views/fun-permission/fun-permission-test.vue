<template>
  <div>
    <a-card class="card" :bordered="false">
      <a-alert
        :message="$t('ui:custom-test-title')"
        type="success"
      >
        <p slot="description">
          鉴权指令使用方式请参照当前页面的源码<br/>
          当前页面还有个特点,那就是这个页面属于一个一级菜单,如果您也有类似需求,请参考这个页面的路由配置方式<br/>
          请切换语言观察界面语言/标题栏的变化
          <br/>
          如果需要测试菜单权限(路由权限),则使用 账号:test 密码:test
          进入test账号后, 如果访问admin的菜单, 会进入404页面
        </p>
      </a-alert>
      <br/>
      <a-button v-action:not-exists-permission>1.不存在的权限按钮</a-button>
      <a-button v-action:user_add>2.新增用户v-action:user_add</a-button>
      <br/>
      <br/>
      <a-button v-if="$auth('not-exists-permission')">3.不存在的权限按钮</a-button>
      <a-button v-if="$auth('user_add')">4.新增用户$auth('user_add')</a-button>
      <!-- 菜单权限可以不传, 如果传了, 则必须同时具备菜单权限和操作权限才可见 -->
      <a-button v-if="$auth('user_add','xxx')">5.xxx</a-button>
      <br/>
      <br/>
      <!-- 菜单权限可以不传, 如果传了, 则必须同时具备菜单权限和操作权限才可见 -->
      <a-button v-if="$auth('user_add','fun-permission')">6.新增用户$auth('user_add','fun-permission')</a-button>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'fun-permission-test',
    created: function () {
      console.log('1-created')
    },
    mounted: function () {
      console.log('2-mounted')
    },
    activated: function () {
      console.log('3-activated')
    },
    deactivated: function () {
      console.log('4-deactivated')
    }
  }
</script>

<style scoped>

</style>