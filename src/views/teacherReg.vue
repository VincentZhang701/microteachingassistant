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
import NavigationPane from '@/views/NavigationPane'
export default {
  components: { NavigationPane },
  store,
  name: 'teacherReg',
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  created () {
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
            password: values.password,
            email: values.userEmail
          }
          const res = await this.$Http.reG(teacherData, {})
          console.log(res)
          this.$message.success('注册成功')
          await this.$router.push('/log_in')
        } else {
          this.$message.error('注册失败')
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
    validateToNextPassword (rule, value, callback) {
      const form = this.form
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
