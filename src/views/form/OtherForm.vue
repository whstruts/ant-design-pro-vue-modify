<template>
  <a-card title="仓库信息" :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">

      <a-row class="form-row" :gutter="16">
        <a-col :md="{span:4,offset:10}" :sm="24">
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar"/>
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'"/>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <br/>
        </a-col>
      </a-row>

      <a-row class="form-row" :gutter="16">
        <a-col :md="12" :sm="24">
          <a-form-item
            label="属性1"
            :labelCol="{lg: {span: 6}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 18}, sm: {span: 17} }"
          >
            <a-input
              v-decorator="['atrr_1',{rules: [{ required: true, message: '请输入...' }]}]"
              name="atrr_1"
              placeholder="请输入..."/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item
            label="属性2"
            :labelCol="{lg: {span: 6}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 18}, sm: {span: 17} }"
          >
            <a-select
              placeholder="请选择审批员"
              v-decorator="[ 'approver', {rules: [{ required: true, message: '请选择审批员'}]} ]">
              <a-select-option value="王晓丽">王晓丽</a-select-option>
              <a-select-option value="李军">李军</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row class="form-row" :gutter="16">
        <a-col :md="12" :sm="24">
          <a-form-item
            label="属性3"
            :labelCol="{lg: {span: 6}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 18}, sm: {span: 17} }"
          >
            <a-range-picker
              style="width: 100%"
              v-decorator="[
                'dateRange',
                {rules: [{ required: true, message: '请选择生效日期'}]}
              ]"/>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item
            label="属性4"
            :labelCol="{lg: {span: 6}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 18}, sm: {span: 17} }"
          >
            <a-input
              v-decorator="['atrr_2',{rules: [{ required: true, message: '请输入...' }]}]"
              name="atrr_4"
              placeholder="请输入..."/>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row class="form-row" :gutter="16">
        <a-col :md="24" :sm="24">
          <a-form-item
            label="属性6"
            :labelCol="{lg: {span: 3}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 21}, sm: {span: 17} }"
          >
            <a-textarea
              rows="4"
              placeholder="请输入衡量标准"
              v-decorator="[
                'type',
                {rules: [{ required: true, message: '请输入衡量标准' }]}
              ]"/>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </a-form-item>

    </a-form>
  </a-card>
</template>

<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  name: 'BaseForm',
  data () {
    return {
      description: '适用于属性比较多的表单',
      value: 1,

      // form
      form: this.$form.createForm(this),
      loading: false,
      imageUrl: ''
    }
  },
  methods: {

    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="less" scoped>
  .avatar-uploader /deep/ .ant-upload.ant-upload-select-picture-card {
    width: 100%;
  }
</style>
