<template>
<div>
  <div class="header">
    <a-page-header title="给教师留言" sub-title="微助教" style="background: lavender"/>
  </div>
  <div>
    <a-radio-group default-value="true" button-style="solid" @change="onChange">
      <a-radio-button value="true">
        匿名
      </a-radio-button>
      <a-radio-button value="false">
        实名
      </a-radio-button>
    </a-radio-group>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item v-if="!isAnonymous" label="你的名字">
        <a-input
          v-decorator="['stuName',{ rules: [{ required: true, message: '请输入你的姓名!' }] }]"
        />
      </a-form-item>
      <a-form-item label="老师">
        <a-select style="width: 120px"
          v-decorator="['teacherName',{ rules: [{ required: true, message: '请选择老师!' }] }]"
        >
          <a-select-option v-for="teacherN in teacherList" :key="teacherN">
            {{ teacherN }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="留言">
        <a-input
          v-decorator="['msg',{ rules: [{ required: true, message: '请留言!' }] }]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          留言
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'stuMsg',
  data () {
    return {
      formLayout: 'horizontal',
      isAnonymous: true,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      teacherList: [],
      teacherKP: []
    }
  },
  async created () {
    const res = await this.$Http.getTeacherList()
    this.teacherList = []
    this.teacherKP = []
    for (let i = 0; i < res.length; i++) {
      this.teacherList.push(res[i].name)
      this.teacherKP[res[i].name] = res[i].id
    }
    console.log(res)
  },
  methods: {
    onChange (e) {
      this.isAnonymous = !this.isAnonymous
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const postData = {
            tid: this.teacherKP[values.teacherName],
            sender: null,
            sendTime: moment(Date.now()).format('yyyy-MM-DD') + 'T' + moment(Date.now()).format('HH:mm:ss') + '.000',
            etitle: values.msg
          }
          console.log(postData)
          if (this.isAnonymous) {
            postData.sender = '匿名'
          } else {
            postData.sender = values.stuName
          }
          const res = await this.$Http.stuMsg(postData)
          console.log('Received values of form: ', postData)
          console.log(res)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
