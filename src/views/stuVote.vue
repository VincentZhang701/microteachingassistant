<template>
  <div>
  <div class="header">
    <a-page-header title="投票" sub-title="微助教" style="background: lavender"/>
  </div>
  <div>
    <p>投票主题</p>
  </div>
  <div>
    <a-table rowKey="choice" :columns="columns" :data-source="data" :row-selection="rowSelection" :showHeader="false" :pagination="false"/>
  </div>
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
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
          投票
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'stuVote',
  data () {
    return {
      columns: [
        {
          dataIndex: 'choice'
        }
      ],
      paramId: null,
      data: [],
      selectedData: [],
      rowSelection: {
        onChange: (selectedRowKeys) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRowKeys)
          this.selectedData = selectedRowKeys
        }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  async created () {
    this.paramId = this.$route.query.id
    let res = []
    res = await this.$Http.getVoteOptions(this.paramId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.data = res
    console.log(res)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const postData = []
          for (let i = 0; i < this.selectedData.length; i++) {
            postData.push({
              vid: this.paramId,
              sname: values.stuName,
              choice: this.selectedData[i]
            })
          }
          const res = await this.$Http.stuVote(postData, {})
          console.log(res)
          console.log(postData)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
