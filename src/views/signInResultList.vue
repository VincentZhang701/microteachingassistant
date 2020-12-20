<template>
  <div>
    <div>
      <div class="header">
        <navigation-pane></navigation-pane>
      </div>
      <div class="voteList">
        <a-list :data-source="listItemData" item-layout="horizontal" style="margin: 10px">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
              :description="item.newDescription"
              @click="gotoVote(item.cid)"
            >
              <div slot="title">{{ item.title }}</div>
              <a-avatar
                slot="avatar"
                icon="pushpin"
                shape="square"
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
import NavigationPane from '@/views/NavigationPane'

export default {
  name: 'signInResultList',
  components: { NavigationPane },
  store,
  moment,
  async created () {
    if (store.state.isLoggedIn === false) {
      await this.$router.push('/log_in')
    }
    document.title = '签到列表'
    store.commit('changeTitle', '已发布的签到')
    const teacherID = store.state.teacherTID
    let res = []
    res = await this.$Http.getSignList(teacherID, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

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
  }
}
</script>

<style scoped>

</style>
