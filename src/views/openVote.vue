<template>
  <div>
    <div class="header">
      <NavigationPane></NavigationPane>
    </div>
    <div>
      <p></p>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" :required="false" label="主题">
          <a-input
            v-decorator="[
          `theme`,
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '主题不能为空',
              },
            ],
          },
        ]"
            style="width: 60%;margin-right: 8px"
          />
        </a-form-item>
        <a-form-item
          v-for="(k, index) in form.getFieldValue('keys')"
          :key="k"
          v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
          :label="index === 0 ? '选项：' : ''"
          :required="false"
        >
          <a-input
            v-decorator="[
          `names[${k}]`,
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '选项不能为空，请填写该投票选项或删除它',
              },
            ],
          },
        ]"
            style="width: 60%; margin-right: 8px"
          />
          <a-icon
            v-if="form.getFieldValue('keys').length > 1"
            :disabled="form.getFieldValue('keys').length === 1"
            class="dynamic-delete-button"
            type="minus-circle-o"
            @click="() => remove(k)"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel">
          <a-button style="width: 60%" type="dashed" @click="add">
            <a-icon type="plus"/>
            选项
          </a-button>
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel">
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

let id = 0
export default {
  name: 'openVote',
  components: { NavigationPane },
  store,
  data () {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 20,
            offset: 4
          }
        }
      }
    }
  },
  created () {
    if (store.state.isLoggedIn === false) {
      this.$message.error('未登录，请先登录！')
      this.$router.push('/log_in')
    }
    document.title = '发布投票'
    store.commit('changeTitle', '发布投票')
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'vote_form' })
    this.form.getFieldDecorator('keys', {
      initialValue: [],
      preserve: true
    })
  },
  methods: {
    remove (k) {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      // We need at least one passenger
      if (keys.length === 1) {
        return
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      })
    },
    add () {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(id++)
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          // const postData = {
          //   vote: values.theme,
          //   tid: 2,
          //   options: values.names
          // }
          const postData = {
            options: [],
            vote: {
              tid: store.state.teacherTID,
              theme: values.theme,
              releaseTime: moment(Date.now()).format('yyyy-MM-DD') + 'T' + moment(Date.now()).format('HH:mm:ss') + '.000'
            }
          }
          const {
            keys,
            names
          } = values
          let optionList = []
          optionList = keys.map(key => names[key])
          for (let i = 0; i < optionList.length; i++) {
            postData.options.push({
              choice: optionList[i]
            })
          }
          const res = await this.$Http.createVote(postData, {})
          store.commit('changeQRCode', 'http://localhost:8080/vote?id=' + res)
          await this.$router.push('/qrCode')
        }
      })
    }
  }
}
</script>

<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
