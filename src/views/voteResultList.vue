<template>
  <div>
    <div class="header">
      <navigation-pane></navigation-pane>
    </div>
    <div class="voteList">
      <a-list :data-source="listItemData" item-layout="horizontal" style="margin: 10px">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            :description="item.newDescription"
            @click="gotoVote(item.vid)"
          >
            <div slot="title">{{ item.theme }}</div>
            <a-avatar
              slot="avatar"
              icon="pie-chart"
              shape="square"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import moment from 'moment'
import NavigationPane from '@/views/NavigationPane'

export default {
  name: 'voteResultList',
  components: { NavigationPane },
  store,
  data () {
    return {
      listItemData: []
    }
  },
  async created () {
    if (store.state.isLoggedIn === false) {
      this.$message.error('未登录，请先登录！')
      await this.$router.push('/log_in')
    }
    document.title = '投票结果'
    store.commit('changeTitle', '已发布的投票')
    const teacherID = store.state.teacherTID
    let res = []
    res = await this.$Http.getVoteList(teacherID, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    for (let i = 0; i < res.length; i++) {
      res[i].releaseTime = moment(res[i].releaseTime).format('YYYY-MM-DD HH:mm:ss')
      res[i].newDescription = '发布时间：' + res[i].releaseTime
    }
    this.listItemData = res
  },
  methods: {
    gotoVote (vid) {
      this.$router.push({
        path: '/voteDetail',
        query: {
          id: vid
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
