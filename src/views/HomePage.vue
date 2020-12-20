<template>
  <div>
    <div class="header">
      <NavigationPane id='0'></NavigationPane>
    </div>
    <div class="content">
      <h1 style="text-align: center; margin-top: 50px; margin-bottom: 60px">
        教师入口
      </h1>
    </div>
    <div class="buttons" style="text-align: center;">
      <a-button v-if="!logIsIn" style="margin: 10px 10px 10px 10px" type="primary" @click="_logIn()">
        登录
      </a-button>
      <a-button v-if="!logIsIn" style="margin: 10px 10px 10px 10px" @click="_reg()">
        注册
      </a-button>
      <a-button v-if="logIsIn" style="margin: 10px 10px 10px 10px" type="primary" @click="_goHome()">
        我的主页
      </a-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import NavigationPane from '@/views/NavigationPane'

export default {
  components: { NavigationPane },
  store,
  name: 'HomePage',
  data () {
    return {
      logIsIn: store.state.isLoggedIn
    }
  },
  created () {
    document.title = '欢迎!'
    store.commit('changeTitle', '欢迎使用')
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
  }
}
</script>

<style scoped>
.content {
  background-repeat: no-repeat;
  height: 300px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.content > h1 {
  height: 300px;
  width: 100%;
  background-color: rgb(0, 0, 0, .15);
  backdrop-filter: blur(5px);
}
</style>
