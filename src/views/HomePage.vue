<template>
  <div>
    <div class="header">
      <a-page-header title="欢迎使用" sub-title="微助教" style="background: lavender">
        <a-avatar v-if="!logIsIn" slot="extra">未登录</a-avatar>
        <a-avatar v-if="logIsIn" slot="extra" style="background: green">已登录</a-avatar>
      </a-page-header>
    </div>
    <div class="content">
      <h1 style="text-align: center; margin-top: 50px; margin-bottom: 60px">
        教师入口
      </h1>
    </div>
    <div class="buttons" style="text-align: center;">
      <a-button v-if="!logIsIn" type="primary" @click="_logIn()" style="margin: 10px 10px 10px 10px">
        登录
      </a-button>
      <a-button v-if="!logIsIn" @click="_reg()" style="margin: 10px 10px 10px 10px">
        注册
      </a-button>
      <a-button v-if="logIsIn" type="primary" @click="_goHome()" style="margin: 10px 10px 10px 10px">
        我的主页
      </a-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
export default {
  store,
  name: 'HomePage',
  created () {
    document.title = '欢迎!'
  },
  methods: {
    _logIn () {
      this.$router.push('/log_in')
    },
    _reg () {
      this.$router.push('/reg')
    },
    _goHome () {
      this.$router.push('/myHome')
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
.content{
  background-repeat: no-repeat;
  height:300px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.content>h1{
  height:300px;
  width: 100%;
  background-color: rgb(0,0,0,.15);
  backdrop-filter: blur(5px);
}
</style>
