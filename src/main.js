// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//引入仓库
import store from './store'

//引入样式
import './assets/css/reset.css'
//引入公共组件
import './components'
//引入过滤器
import './filters'

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入路由


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
