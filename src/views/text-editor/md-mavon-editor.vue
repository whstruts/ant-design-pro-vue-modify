<template>
  <a-card>
    <p>官网: <a href="https://github.com/hinesboy/mavonEditor" target="_blank">https://github.com/hinesboy/mavonEditor</a></p>
    <mavon-editor v-model="value"/>
    <a-button @click="getMdValue">获取内容</a-button>
  </a-card>
</template>

<script>

  export default {
    name: 'md-mavon-editor',
    components: {
    },
    data () {
      return { value: '' }
    },
    methods:{
      getMdValue(){
        console.log(this.value)
      }
    }
  }
</script>

<style scoped>

</style>