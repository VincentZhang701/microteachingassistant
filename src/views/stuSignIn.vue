<template>
  <div>
  <div class="header">
    <a-page-header title="签到" sub-title="微助教" style="background: lavender"/>
  </div>
  <div>
    <p>签到主题</p>
    <a-button type="primary" @click="signIn()">签到</a-button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'stuSignIn',
  methods: {
    signIn () {
    }
  }
}
</script>

<style scoped>

</style>
