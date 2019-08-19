<template>
    <div>
      <list-view v-if="$route.name==='list-route-ui'"></list-view>
      <router-view v-else></router-view>
    </div>
</template>

<script>
  import ListView from './list-ui'
  export default {
    name: 'Index.vue',
    components:{
      ListView
    }
  }
</script>

<style scoped>

</style>