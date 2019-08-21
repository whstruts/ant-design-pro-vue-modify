<template>
  <div>
    <p>这是详细页内容</p>
    <a-button @click="onClick">返回管理(列表)页</a-button>
  </div>
</template>

<script>
export default {
  name: 'ListPage',
  methods: {
    onClick () {
      this.$router.push({ name: 'list-route-ui' })
    }
  }
}
</script>

<style scoped>

</style>
