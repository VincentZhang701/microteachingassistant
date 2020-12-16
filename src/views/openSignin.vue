<template>
<div>
  <div class="header">
    <a-page-header title="发布签到" sub-title="微助教" style="background: lavender">
      <a-avatar v-if="!logIsIn" slot="extra">未登录</a-avatar>
      <a-avatar v-if="logIsIn" slot="extra" style="background: green">已登录</a-avatar>
    </a-page-header>
  </div>
  <div class="content">
    <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
      <a-form-item label="主题">
        <a-input v-decorator="['theme', config1]" />
      </a-form-item>
      <a-form-item label="开始时间">
        <a-time-picker v-decorator="['start-time', config]" />
      </a-form-item>
      <a-form-item label="结束时间">
        <a-time-picker v-decorator="['end-time', config]" />
      </a-form-item>
      <a-form-item
        :wrapper-col="{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      }"
      >
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script>
import store from '@/store'
import moment from 'moment'
export default {
  name: 'openSignIn',
  store,
  computed: {
    logIsIn () {
      return store.state.isLoggedIn
    }
  },
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
        rules: [{ type: 'object', required: true, message: '请选择时间!' }]
      },
      config1: {
        rules: [{ required: true, message: '主题不能为空' }]
      }
    }
  },
  created () {
    document.title = '发布签到'
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'signIn_form' })
  },
  methods: {
    async handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, fieldsValue) => {
        if (err) {
          return
        }
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
        console.log(a)
      })
    }
  }
}
</script>

<style scoped>

</style>
