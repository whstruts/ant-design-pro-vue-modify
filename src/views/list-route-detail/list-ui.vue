<template>
  <div>
    <div v-if="$route.name==='list-route-ui'">
      <p>这是管理(列表)页内容</p>
      <a-button @click="onClick">以路由方式转入详细页</a-button>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  name: 'ListPage',
  methods: {
    onClick () {
      this.$router.push({ name: 'detail-route-ui' })
    }
  }
}
</script>

<style scoped>

</style>
