<template>
  <div>
    <div>
      <div class="header">
        <navigation-pane></navigation-pane>
      </div>
      <div class="voteList">
        <a-list item-layout="horizontal" :data-source="listItemData" style="margin: 10px">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
              :description="item.newDescription"
            >
              <div slot="title">{{ item.etitle }}</div>
              <a-avatar
                shape="square"
                slot="avatar"
              >
                {{item.sender}}
              </a-avatar>
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
  name: 'msgResultList',
  components: { NavigationPane },
  store,
  moment,
  async created () {
    document.title = '消息列表'
    store.commit('changeTitle', '留言列表')
    // const teacherID = store.state.teacherTID
    const teacherID = 23
    let res = []
    res = await this.$Http.getTeacherMsg(teacherID, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(res)
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].sendTime)
      res[i].sendTime = moment(res[i].sendTime).format('YYYY-MM-DD HH:mm:ss')
      res[i].newDescription = '发送人：' + res[i].sender + '\t\t\t发送时间：' + res[i].sendTime
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
