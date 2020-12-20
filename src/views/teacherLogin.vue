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
            <a-icon slot="prefix" style="color: rgba(0,0,0,.25)" type="user"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
            placeholder="密码"
            type="password"
          >
            <a-icon slot="prefix" style="color: rgba(0,0,0,.25)" type="lock"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button class="login-form-button" html-type="submit" type="primary">
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
    if (store.state.isLoggedIn === true) {
      this.$router.push('/')
    }
    document.title = '登录!'
    store.commit('changeTitle', '登录')
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          // const teacherData = values.userName
          const teacherData = {
            name: values.userName,
            password: this.$md5(values.password)
          }
          const res = await this.$Http.teacherLogIn(teacherData, {})
          if (res.response !== undefined) {
            if (res.response.status === 400) {
              this.$message.error('密码错误')
            } else if (res.response.status === 404) {
              this.$message.error('用户不存在')
            }
          } else {
            this.$message.success('登录成功')
            store.commit('changeLoggingStatus', true)
            store.commit('changeTeacherID', res.id)
            store.commit('changeTeacherName', res.name)
            await this.$router.push('/myhome')
          }
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
