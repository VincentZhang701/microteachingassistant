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
          'teacherName',
          { rules: [{ required: true, message: '请输入姓名!' }] },
        ]"
            placeholder="姓名"
          >
            <a-icon slot="prefix" style="color: rgba(0,0,0,.25)" type="contacts"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
            'userEmail',
            {
            rules: [{
                type: 'email',
                message: '邮箱格式不正确!',
              },
              {
                required: true,
                message: '请输入邮箱!'
              }]
            },
          ]"
            placeholder="邮箱"
          >
            <a-icon slot="prefix" style="color: rgba(0,0,0,.25)" type="mail"/>
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
                validator: validatePassword,
              },
            ],
          },
        ]"
            placeholder="密码"
            type="password"
          >
            <a-icon slot="prefix" style="color: rgba(0,0,0,.25)" type="lock"/>
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
            placeholder="确认密码"
            type="password"
            @blur="handleConfirmBlur"
          >
            <a-icon slot="prefix" style="color: rgba(0,0,0,.25)" type="lock"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button class="login-form-button" html-type="submit" type="primary">
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
import NavigationPane from '@/views/NavigationPane'

export default {
  components: { NavigationPane },
  store,
  name: 'teacherReg',
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  created () {
    if (store.state.isLoggedIn === true) {
      this.$router.push('/')
    }
    document.title = '注册!'
    store.commit('changeTitle', '注册')
  },
  methods: {
    async handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const teacherData = {
            name: values.teacherName,
            password: this.$md5(values.password),
            email: values.userEmail
          }
          const res = await this.$Http.reG(teacherData, {})
          if (res.response !== undefined) {
            this.$message.error('注册失败')
          } else {
            this.$message.success('注册成功')
            await this.$router.push('/log_in')
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
        const aPrompt = '两次输入密码不一致!'
        callback(aPrompt)
      } else {
        callback()
      }
    },
    validatePassword (rule, value, callback) {
      const form = this.form
      if (value.length <= 8) {
        const aPrompt = '密码长度太短，须大于8字符!'
        callback(aPrompt)
      } else if (value.length >= 16) {
        const aPrompt = '密码太长，须小于16字符!'
        callback(aPrompt)
      }
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
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
