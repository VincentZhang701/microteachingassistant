<template>
<div>
  <div>
    <div class="header">
      <a-page-header title="签到结果" sub-title="微助教" style="background: #e6e6fa">
        <a-avatar v-if="!logIsIn" slot="extra">未登录</a-avatar>
        <a-avatar v-if="logIsIn" slot="extra" style="background: green">已登录</a-avatar>
      </a-page-header>
    </div>
    <div class="voteList">
      <a-list item-layout="horizontal" :data-source="listItemData" style="margin: 10px">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
            :description="item.time"
            @click="gotoVote(index)"
          >
            <div slot="title">{{ item.title }}</div>
            <a-avatar
              shape="square"
              slot="avatar"
              :src="vLogo"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</div>
</template>

<script>
import store from '@/store'
export default {
  name: 'signInResultList',
  store,
  data () {
    return {
      vLogo: require('../assets/logo.png'),
      listItemData: [{
        title: '签到主题一',
        time: '2021-2-1',
        id: '0'
      },
      {
        title: '签到主题二',
        time: '2099-2-1',
        id: '1'
      },
      {
        title: '签到主题三',
        time: '2921-12-31',
        id: '2'
      },
      {
        title: '签到主题四',
        time: '3021-5-21',
        id: '3'
      }]
    }
  },
  created () {
    document.title = '签到结果'
  },
  methods: {
    gotoVote (sid) {
      this.$router.push({
        path: '/signDetail',
        query: {
          id: sid
        }
      })
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
