<template>
  <a-card>
    <p>官网: <a href="http://www.wangeditor.com/" target="_blank">http://www.wangeditor.com/</a></p>
    <p>文档: <a href="https://www.kancloud.cn/wangfupeng/wangeditor3/335771" target="_blank">https://www.kancloud.cn/wangfupeng/wangeditor3/335771</a>
    </p>
    <div id="div1" class="toolbar">
    </div>
    <div style="padding: 5px 0; color: #ccc">中间隔离带</div>
    <div ref="editorElem" id="div2" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
      <p>请输入内容</p>
    </div>
  </a-card>
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'WangEditor',
  data () {
    return {
      editor: null,
      editorContent: ''
    }
  },
  props: ['catchData', 'content', 'langConfig'], // 接收父组件的方法
  watch: {
    content () {
      this.editor.txt.html(this.content)
    },
    langConfig (newVal) {
      console.log(newVal, this.editor)
    }
  },
  mounted () {
    this.editor = new E('#div1', this.$refs.editorElem)
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html
      if (this.catchData) {
        this.catchData(this.editorContent) // 把这个html通过catchData的方法传入父组件
      }
    }
    this.editor.customConfig.uploadImgServer = 'http://192.168.1.100:8001/api/mail-template/upload'
    this.editor.customConfig.uploadFileName = 'testFile'
    this.editor.customConfig.menus = [ // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    // 下面是最重要的的方法
    this.editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        this.imgUrl = result.dataContent
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function (xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },

      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        const url = result.dataContent // result.data就是服务器返回的图片名字和链接
        insertImg(url)
        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }

    if (this.langConfig) {
      this.editor.customConfig.lang = this.langConfig
    }
    this.editor.customConfig.zIndex = 100
    this.editor.create() // 创建富文本实例
    if (!this.content) {
      this.editor.txt.html('')
    }
  },
  created () {
    const _this = this
    setTimeout(() => {
      _this.content = `<h1 class="ql-align-center">
                          <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p><br></p>
                        <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
                        <p><br></p>
                        <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
                        <p><br></p>
                        <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
                        <p><br></p>
                        <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
                        <p><br></p>
                        <pre class="ql-syntax" spellcheck="false">const a = 10;<br>const editorOption = { highlight: text => hljs.highlightAuto(text).value };</pre>
                        <p><br></p>
                        <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
                        <p><br></p>
                        <p><a href="https://surmon.me/" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
                        <p><br></p>
                        <iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe>
                        <p><br></p>
                        <p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
                        `
    }, 3000)
  }
}
</script>

<style scoped>
  .toolbar {
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .text {
    border: 1px solid #ccc;
    height: 400px;
    border-radius: 3px;
  }
</style>
