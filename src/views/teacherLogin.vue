<template>
  <div>
    <div class="header">
      <a-page-header title="登录" sub-title="微助教" style="background: lavender">
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
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
          或者
          <a href="/reg">
            现在注册
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
  name: 'teacherLogin',
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  data () {
    return {
    }
  },
  created () {
    document.title = '登录!'
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          const teacherData = 'laoshi'
          axios.post('http://localhost:9090/Teacher/findOne', teacherData, {
            headers: {
              'Content-Type': 'text/plain'
            }
          })
            .then((r) => { console.log(r) })
        }
      })
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
