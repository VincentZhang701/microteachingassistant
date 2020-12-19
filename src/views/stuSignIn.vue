<template>
  <div>
  <div class="header">
    <a-page-header title="签到" sub-title="微助教" style="background: lavender"/>
  </div>
  <div>
    <p>签到主题</p>
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
          'stuID',
          { rules: [{ required: true, message: '请输入学号!' }] },
        ]"
          placeholder="学号"
        >
          <a-icon slot="prefix" type="contacts" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'stuName',
          { rules: [{ required: true, message: '请输入姓名!' }] },
        ]"
          placeholder="姓名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">
          签到
        </a-button>
      </a-form-item>
    </a-form>
  </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'stuSignIn',
  data () {
    return {
      signInID: null
    }
  },
  created () {
    document.title = '签到'
    this.signInID = this.$route.query.id
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const postData = {
            cid: this.signInID,
            stuid: values.stuID,
            stuName: values.stuName,
            checkTime: moment(Date.now()).format('yyyy-MM-DD') + 'T' + moment(Date.now()).format('HH:mm:ss') + '.000',
            checkLocation: '武汉'
          }
          const res = await this.$Http.stuSign(postData, {})
          if (res === 'fail') {
            this.$message.error('签到失败，请确保是在有效时间之内！')
          } else if (res === 'success') {
            this.$message.success('签到成功')
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
