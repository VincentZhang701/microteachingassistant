<template>
  <div>
    <div class="header">
      <a-page-header style="background: lavender" sub-title="微助教" title="投票"/>
    </div>
    <div>
      <p>投票主题</p>
      <p>{{ this.voteTitle }}</p>
    </div>
    <div>
      <a-table :columns="columns" :data-source="data" :pagination="false" :row-selection="rowSelection" :showHeader="false"
               rowKey="choice"/>
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
          <a-icon slot="prefix" style="color: rgba(0,0,0,.25)" type="user"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button class="login-form-button" html-type="submit" type="primary">
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
      voteTitle: null,
      selectedData: [],
      rowSelection: {
        onChange: (selectedRowKeys) => {
          // (`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRowKeys)
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
    this.voteTitle = await this.$Http.findVoteName(this.paramId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.voteTitle = this.voteTitle.theme
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
          await this.$Http.stuVote(postData, {})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
