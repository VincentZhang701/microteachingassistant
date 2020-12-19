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
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            :description="item.newDescription"
            @click="gotoVote(item.cid)"
          >
            <div slot="title">{{ item.title }}</div>
            <a-avatar
              shape="square"
              slot="avatar"
              icon="pushpin"
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
import moment from 'moment'
export default {
  name: 'signInResultList',
  store,
  moment,
  async created () {
    document.title = '签到列表'
    // const teacherID = store.state.teacherTID
    const teacherID = store.state.teacherTID
    let res = []
    res = await this.$Http.getSignList(teacherID, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(res)
    for (let i = 0; i < res.length; i++) {
      res[i].startTime = moment(res[i].startTime).format('YYYY-MM-DD HH:mm:ss')
      res[i].endTime = moment(res[i].endTime).format('YYYY-MM-DD HH:mm:ss')
      res[i].newDescription = '开始时间：' + res[i].startTime + ' ~ 结束时间：' + res[i].endTime
    }
    this.listItemData = res
  },
  data () {
    return {
      // vLogo: require('../assets/logo.png'),
      listItemData: []
    }
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
