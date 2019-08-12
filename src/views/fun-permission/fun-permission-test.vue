<template>
  <div>
    <a-card class="card" :bordered="false">
      <a-button v-action:not-exists-permission>不存在的权限按钮</a-button>
      <a-button v-action:user_add>新增用户</a-button>
      <br/>
      <br/>
      <a-button v-if="$auth('not-exists-permission')">不存在的权限按钮</a-button>
      <a-button v-if="$auth('user_add')">新增用户</a-button>
      <!-- 菜单权限可以不传, 如果传了, 则必须同时具备菜单权限和操作权限才可见 -->
      <a-button v-if="$auth('user_add','xxx')">xxx</a-button>
      <br/>
      <br/>
      <!-- 菜单权限可以不传, 如果传了, 则必须同时具备菜单权限和操作权限才可见 -->
      <a-button v-if="$auth('user_add','fun-permission')">新增用户</a-button>
    </a-card>
  </div>
</template>

<script>
  export default {
    name: 'fun-permission-test'
  }
</script>

<style scoped>

</style>