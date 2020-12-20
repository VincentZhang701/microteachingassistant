<template>
  <div>
    <div class="header">
      <navigation-pane></navigation-pane>
    </div>
    <div class="Hello">
      <h2 v-if="greeting=(nowTime<9?'早上好':
                    nowTime<12?'上午好':
                    nowTime<15?'中午好':
                    nowTime<19?'下午好':
                    '晚上好'
                    )"
          style="text-align: center; margin-top: 50px; margin-bottom: 60px">{{ greeting }},{{ this.teacherWhatName }}</h2>
    </div>
    <div class='content'>
      <a-button style="width: 240px;height: 43px;margin: 5px" type="primary" @click="goVote()">发布投票</a-button>
      <a-button style="width: 240px;height: 43px;margin: 5px" @click="goSign()">发布签到</a-button>
    </div>
    <div class='content'>
      <a-button style="width: 240px;height: 43px;margin: 5px" type="primary" @click="goVoteResult()">查看投票结果</a-button>
      <a-button style="width: 240px;height: 43px;margin: 5px" @click="goSignResult()">查看签到结果</a-button>
    </div>
    <div class='content'>
      <a-button style="width: 240px;height: 43px;margin: 5px" type="primary" @click="goMsg()">查看留言</a-button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import NavigationPane from '@/views/NavigationPane'

export default {
  name: 'teacherHome',
  components: { NavigationPane },
  created () {
    if (store.state.isLoggedIn === false) {
      this.$message.error('未登录，请先登录！')
      this.$router.push('/log_in')
    }
    document.title = '主页!'
    store.commit('changeTitle', '主页')
  },
  data () {
    return {
      greeting: 'Hello',
      nowTime: new Date().getHours(),
      teacherWhatName: store.state.teacherName
    }
  },
  methods: {
    goVote () {
      this.$router.push('/openVote')
    },
    goSign () {
      this.$router.push('/openSignIn')
    },
    goVoteResult () {
      this.$router.push('/voteResultList')
    },
    goSignResult () {
      this.$router.push('/signResultList')
    },
    goMsg () {
      this.$router.push('/myMsg')
    }
  }
}
</script>

<style scoped>
.content {
  max-width: fit-content;
  margin: auto;
}

.Hello {
  max-width: fit-content;
  margin: auto;
  font-family: "Yu Gothic UI Semibold"
}
</style>
