import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Http from '@/services/Http'

// import ant design
import { Tag, Table, List, Button, Avatar, message, PageHeader, Form, Input, Icon, Checkbox, Select, TimePicker, Radio } from 'ant-design-vue'
import md5 from 'js-md5'

Vue.config.productionTip = false

Vue.component(Button.name, Button)
Vue.component(Tag.name, Tag)
Vue.component(Avatar.name, Avatar)
Vue.component(PageHeader.name, PageHeader)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Input.name, Input)
Vue.component(Icon.name, Icon)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(TimePicker.name, TimePicker)
Vue.component(List.name, List)
Vue.component(List.Item.name, List.Item)
Vue.component(List.Item.Meta.name, List.Item.Meta)
Vue.component(Radio.name, Radio)
Vue.component(Radio.Group.name, Radio.Group)
Vue.component(Radio.Button.name, Radio.Button)
Vue.component(Checkbox.Group.name, Checkbox.Group)
Vue.component(Table.name, Table)

Vue.prototype.$message = message
Vue.prototype.$Http = Http
Vue.prototype.$md5 = md5

message.config({
  duration: 2, // 持续时间
  top: '100px', // 到页面顶部距离
  maxCount: 1 // 最大显示数, 超过限制时，最早的消息会被自动关闭
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
