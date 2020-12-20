<template>
  <div>
    <div class="header">
      <navigation-pane></navigation-pane>
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
import NavigationPane from '@/views/NavigationPane'
export default {
  components: { NavigationPane },
  store,
  name: 'teacherLogin',
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  data () {
    return {
      password: null
    }
  },
  created () {
    document.title = '登录!'
    store.commit('changeTitle', '登录')
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const teacherData = values.userName
          const res = await this.$Http.logIn(teacherData, {
            headers: {
              'Content-Type': 'text/plain'
            }
          })
          this.password = res.password
          if (this.password === values.password) {
            this.$message.success('登录成功')
            store.commit('changeLoggingStatus', true)
            store.commit('changeTeacherID', res.id)
            store.commit('changeTeacherName', res.name)
            await this.$router.push('/myhome')
            // cookie
          } else {
            this.$message.error('用户名或密码错误')
          }
          console.log(res)
        }
      })
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
