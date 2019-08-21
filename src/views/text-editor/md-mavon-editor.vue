<template>
  <a-card>
    <p>官网: <a href="https://github.com/hinesboy/mavonEditor" target="_blank">https://github.com/hinesboy/mavonEditor</a></p>
    <div class="my-md-editor">
      <mavon-editor codeStyle="dracula" v-model="value"/>
    </div>
    <a-button @click="getMdValue">获取内容</a-button>
  </a-card>
</template>

<script>

export default {
  name: 'MdMavonEditor',
  components: {
  },
  data () {
    return { value: '' }
  },
  methods: {
    getMdValue () {
      console.log(this.value)
    }
  }
}
</script>

<style scoped>
  .my-md-editor >>> .v-note-wrapper{
    z-index: 1000;
  }
</style>
