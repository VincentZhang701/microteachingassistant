<template>
<div>
  <div class="header">
    <a-page-header title="签到结果" sub-title="微助教" style="background: #e6e6fa">
      <a-avatar v-if="!logIsIn" slot="extra">未登录</a-avatar>
      <a-avatar v-if="logIsIn" slot="extra" style="background: green">已登录</a-avatar>
    </a-page-header>
  </div>
  <div>
    <p>签到主题</p>
    <p>{{signTitle}}</p>
    <a-button icon="sync" type="primary" @click="refPage()">刷新</a-button>
  </div>
  <div>
    <p>已签到：{{netResult.length}}</p>
    <a-list item-layout="horizontal" :data-source="netResult">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta
          description="已签到">
          <div slot="title">{{ item }}</div>
          <a-avatar
            slot="avatar"
            icon="user"
            style="background: mediumseagreen"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</div>
</template>

<script>
import store from '@/store'
const netResult = []
export default {
  name: 'signDetail',
  store,
  netResult,
  async created () {
    document.title = '签到详情'
    // const paramId = this.$route.query.id
    const paramId = '3'
    let res = []
    res = await this.$Http.getSignDetail(paramId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(res)
    for (let i = 0; i < res.length; i++) {
      netResult.push(res[i].stuName)
    }
  },
  data () {
    return {
      signTitle: 'Default',
      abc: 123,
      netResult
    }
  },
  methods: {
    refPage () {
      this.$router.go(0)
    }
  },
  computed: {
    logIsIn () {
      return store.state.isLoggedIn
    }
  }
}
</script>

<style scoped>

</style>
