<template>
  <div>
    <div class="header">
      <a-page-header title="注册" sub-title="微助教" style="background: lavender">
        <a-avatar v-if="!logIsIn" slot="extra">未登录</a-avatar>
        <a-avatar v-if="logIsIn" slot="extra" style="background: green">已登录</a-avatar>
      </a-page-header>
    </div>
    <div id="components-login" class="login-form">
      <a-form
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名!' }] },
        ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'teacherName',
          { rules: [{ required: true, message: '请输入姓名!' }] },
        ]"
            placeholder="姓名"
          >
            <a-icon slot="prefix" type="contacts" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'userEmail',
          { rules: [{ required: true, message: '请输入邮箱!' }] },
        ]"
            placeholder="邮箱"
          >
            <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item has-feedback>
          <a-input
            v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item has-feedback>
          <a-input
            v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请确认密码!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
            type="password"
            placeholder="确认密码"
            @blur="handleConfirmBlur"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            注册
          </a-button>
          已有帐号？
          <a href="/log_in">
            现在登录
          </a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import axios from 'axios'
export default {
  store,
  name: 'teacherReg',
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  created () {
    document.title = '注册!'
  },
  methods: {
    async handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const teacherData = {
            name: values.teacherName,
            password: values.password,
            email: values.userEmail
          }
          let flag = true
          await axios.post('http://localhost:9090/Teacher/createTeacher', teacherData)
            .then((r) => { console.log(r) })
            .catch((e) => {
              this.$message.error('用户已存在')
              flag = false
              console.log(flag)
            })
          if (flag === true) {
            this.$message.success('注册成功')
            this.$router.push('/log_in')
          }
        }
      })
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        const aPrompt = 'Two passwords that you enter is inconsistent!'
        callback(aPrompt)
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    }
  },
  computed: {
    logIsIn () {
      return store.state.isLoggedIn
    }
  }

}
</script>

<style scoped>
.login-form {
  max-width: 300px;
  text-align: center;
  margin: auto;
  width: 100%;
}
#components-login .login-form-button {
  width: 100%;
}
</style>
