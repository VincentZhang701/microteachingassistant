<template>
  <div>
    <div class="header">
      <NavigationPane></NavigationPane>
    </div>
    <div class="content">
      <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
        <a-form-item label="主题">
          <a-input v-decorator="['theme', config1]"/>
        </a-form-item>
        <a-form-item label="开始时间">
          <a-time-picker v-decorator="['start-time', config]"/>
        </a-form-item>
        <a-form-item label="结束时间">
          <a-time-picker v-decorator="['end-time', config]"/>
        </a-form-item>
        <a-form-item
          :wrapper-col="{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      }"
        >
          <a-button html-type="submit" type="primary">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import moment from 'moment'
import NavigationPane from '@/views/NavigationPane'

export default {
  name: 'openSignIn',
  components: { NavigationPane },
  store,
  data () {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 10 }
        }
      },
      config: {
        rules: [{
          type: 'object',
          required: true,
          message: '请选择时间!'
        }]
      },
      config1: {
        rules: [{
          required: true,
          message: '主题不能为空'
        }]
      }
    }
  },
  created () {
    if (store.state.isLoggedIn === false) {
      this.$message.error('未登录，请先登录！')
      this.$router.push('/log_in')
    }
    document.title = '发布签到'
    store.commit('changeTitle', '发布签到')
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'signIn_form' })
  },
  methods: {
    async handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, fieldsValue) => {
        if (!err) {
          const values = {
            ...fieldsValue,
            'start-time': fieldsValue['start-time'].format('HH:mm:ss'),
            'end-time': fieldsValue['end-time'].format('HH:mm:ss'),
            theme: fieldsValue.theme
          }
          const postData = {
            title: values.theme,
            tid: store.state.teacherTID,
            startTime: moment(Date.now()).format('yyyy-MM-DD') + 'T' + values['start-time'] + '.000',
            endTime: moment(Date.now()).format('yyyy-MM-DD') + 'T' + values['end-time'] + '.000'
          }
          const a = await this.$Http.createSignIn(postData, {})
          store.commit('changeQRCode', 'http://localhost:8080/signIn?id=' + a)
          await this.$router.push('/qrCode')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
