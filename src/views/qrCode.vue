<template>
  <div>
    <div class="header">
      <NavigationPane></NavigationPane>
    </div>
    <div style="margin: auto;width: 50%;">
      <h2>网址：</h2>
      <a-tag style="height:30px;font-size: 20px;text-align: center">{{ this.qrCode }}</a-tag>
    </div>
    <div style="margin: auto;width: 50%;">
      <h2>二维码：</h2>
      <vue-qr :size="250" :text="this.qrCode"></vue-qr>
    </div>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import store from '@/store'
import NavigationPane from '@/views/NavigationPane'

export default {
  name: 'qrCode',
  store,
  components: {
    NavigationPane,
    vueQr
  },
  created () {
    document.title = '发布结果'
    store.commit('changeTitle', '发布结果')
  },
  data () {
    return {
      qrCode: store.state.qrCode
    }
  }
}
</script>

<style scoped>

</style>
