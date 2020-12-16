module.exports = {
// vue-cli3修改ant的主题色官网配置   vue.config.js for less-loader@6.0.0 ||||||||注意less-loader依赖包的版本一定要是6.0.0或以上|||||||
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
}
