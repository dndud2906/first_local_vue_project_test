import Vue from 'vue'
import {Table, Input, Icon, Button, Tooltip, Form, Select, Collapse ,Popconfirm, Modal, Upload} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
Vue.use(Table);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(Select);
Vue.use(Collapse);
Vue.use(Popconfirm);
Vue.use(Modal);
Vue.use(Upload);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
