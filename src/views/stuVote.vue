<template>
  <div>
  <div class="header">
    <a-page-header title="投票" sub-title="微助教" style="background: lavender"/>
  </div>
  <div>
    <p>投票主题</p>
  </div>
  <div>
    <a-table :columns="columns" :data-source="data" :row-selection="rowSelection" :showHeader="false" :pagination="false"/>
  </div>
    <div>
      <a-button @click="submitVote()" type="primary">投票</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stuVote',
  data () {
    return {
      columns: [
        {
          title: '选项',
          dataIndex: 'option',
          key: 'option'
        }
      ],
      data: [
        {
          key: 0,
          option: '选项一'
        },
        {
          key: 1,
          option: '选项二'
        }
      ],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        }
      }
    }
  },
  methods: {
    submitVote () {
    }
  }
}
</script>

<style scoped>

</style>
