<template>
  <div class="header">
    <a-page-header :title="this.pageTitle" sub-title="微助教" @back="() => $router.go(-1)" style="background: lavender">
      <a-avatar v-if="!logIsIn" slot="extra">未登录</a-avatar>
      <a-avatar v-if="logIsIn" slot="extra" style="background: green">已登录</a-avatar>
    </a-page-header>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'NavigationPane',
  store,
  data () {
    return {
      pageTitle: store.state.pageTitle
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

</style>
