<template>
  <div class="header">
    <a-page-header :title="this.pageTitle" style="background: lavender" sub-title="微助教" @back="() => $router.go(-1)">
      <a-tag v-if="this.logIsIn" slot="extra" color="blue">{{ this.userName }}</a-tag>
      <a-button v-if="this.logIsIn" slot="extra" @click="logOut()">登出</a-button>
      <a-avatar v-if="!this.logIsIn" slot="extra">未登录</a-avatar>
      <a-avatar v-if="this.logIsIn" slot="extra" style="background: green">{{userName[0]}}</a-avatar>
    </a-page-header>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'NavigationPane',
  store,
  methods: {
    logOut () {
      store.commit('changeLoggingStatus', false)
      this.$router.go(0)
    }
  },
  data () {
    return {
      pageTitle: store.state.pageTitle,
      logIsIn: store.state.isLoggedIn,
      userName: store.state.teacherName
    }
  }
}
</script>

<style scoped>

</style>
