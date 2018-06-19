import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'

// 移动端点击３００秒延迟问题
fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'common/error.png',
  loading: require('common/images/default.png'),
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 这样子可以注册到所有的子组件,通过this.$router访问
  store, // 子组件通过this.$store访问
  render: h => h(App)
})
