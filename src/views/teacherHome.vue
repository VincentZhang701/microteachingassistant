<template>
<div>
  <div class="header">
    <a-page-header title="主页" sub-title="微助教" style="background: lavender">
      <a-avatar v-if="!logIsIn" slot="extra">未登录</a-avatar>
      <a-avatar v-if="logIsIn" slot="extra" style="background: green">已登录</a-avatar>
    </a-page-header>
  </div>
  <div class="Hello">
    <h2 style="text-align: center; margin-top: 50px; margin-bottom: 60px"
        v-if="greeting=(nowTime<9?'早上好':
                    nowTime<12?'上午好':
                    nowTime<15?'中午好':
                    nowTime<19?'下午好':
                    '晚上好'
                    )">{{greeting}},{{teacherWhatName}}</h2>
  </div>
  <div class='content'>
    <a-button @click="goVote()" type="primary" style="width: 240px;height: 43px;margin: 5px">发布投票</a-button>
    <a-button @click="goSign()" style="width: 240px;height: 43px;margin: 5px">发布签到</a-button>
  </div>
  <div class='content'>
    <a-button @click="goVoteResult()" type="primary" style="width: 240px;height: 43px;margin: 5px">查看投票结果</a-button>
    <a-button @click="goSignResult()" style="width: 240px;height: 43px;margin: 5px">查看签到结果</a-button>
  </div>
</div>
</template>

<script>
import store from '@/store'
export default {
  name: 'teacherHome',
  created () {
    document.title = '主页!'
  },
  data () {
    return {
      greeting: 'Hello',
      nowTime: new Date().getHours()
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
    }
  },
  computed: {
    logIsIn () {
      return store.state.isLoggedIn
    },
    teacherWhatName () {
      return store.state.teacherName
    }
  }
}
</script>

<style scoped>
.content{
  max-width: fit-content;
  margin: auto;
}
.Hello{
  max-width: fit-content;
  margin: auto;
  font-family: "Yu Gothic UI Semibold"
}
</style>
