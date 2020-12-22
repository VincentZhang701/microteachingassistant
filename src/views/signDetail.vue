<template>
  <div>
    <div class="header">
      <NavigationPane></NavigationPane>
    </div>
    <div  style="margin: 20px">
      <h2>签到主题</h2>
      <h3 style="color: coral;font-weight: bold;font-size: larger">{{ signTitle }}</h3>
      <a-button icon="sync" type="primary" @click="refPage()">刷新</a-button>
    </div>
    <div  style="margin: 20px">
      <p>已签到：<b>{{ netResult.length }}</b></p>
      <a-list :data-source="netResult" item-layout="horizontal">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            :description="item.newDescription">
            <div slot="title">{{ item.stuName }}</div>
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
import NavigationPane from '@/views/NavigationPane'
import moment from 'moment'

export default {
  name: 'signDetail',
  components: { NavigationPane },
  store,
  async created () {
    if (store.state.isLoggedIn === false) {
      await this.$router.push('/log_in')
    }
    this.signInID = this.$route.query.id
    this.signTitle = await this.$Http.findSignName(this.signInID, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.signTitle = this.signTitle.title
    document.title = '签到详情'
    store.commit('changeTitle', '签到详情')
    const paramId = this.$route.query.id
    // const paramId = '3'
    let res = []
    res = await this.$Http.getSignDetail(paramId, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    for (let i = 0; i < res.length; i++) {
      res[i].checkTime = moment(res[i].checkTime).format('YYYY-MM-DD HH:mm:ss')
      res[i].newDescription = '学号：' + res[i].stuid + '\t签到时间：' + res[i].checkTime
    }
    this.netResult = res
  },
  data () {
    return {
      signTitle: 'Default',
      abc: 123,
      netResult: []
    }
  },
  methods: {
    refPage () {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>
