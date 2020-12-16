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
          v-decorator="['stuName',{ rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item label="老师">
        <a-input
          v-decorator="['teacherName',{ rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item label="留言">
        <a-input
          v-decorator="['msg',{ rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'stuMsg',
  data () {
    return {
      formLayout: 'horizontal',
      isAnonymous: true,
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    onChange (e) {
      this.isAnonymous = !this.isAnonymous
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
