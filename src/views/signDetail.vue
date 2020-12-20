<template>
<div>
  <div class="header">
    <NavigationPane></NavigationPane>
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
import NavigationPane from '@/views/NavigationPane'
export default {
  name: 'signDetail',
  components: { NavigationPane },
  store,
  async created () {
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
    console.log(res)
    this.netResult = []
    for (let i = 0; i < res.length; i++) {
      this.netResult.push(res[i].stuName)
    }
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
