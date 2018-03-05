// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'sweetalert2/dist/sweetalert2.min.css'
import swal from 'sweetalert2'
import { getPubilcImg, setBallColor, isSessionIdNull } from './utils'
import VueLazyload from 'vue-lazyload'
import dateFormat from 'dateformat'
import './elemet.io.conf'
import 'animate.css'
console.clear()
Vue.use(VueLazyload)
// import './assets/styles/alone/ct/cd.less'
Vue.config.productionTip = false

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})

/* 将获取路径方法注入到 Vue原型中 */
Vue.prototype.$getPublicImg = (path) => {
  return getPubilcImg(path)
}
Vue.prototype.$setBallColor = (name) => {
  return setBallColor(name)
}
Vue.prototype.$swal = (options) => {
  return swal(Object.assign({}, {
    showConfirmButton: false
  }, options))
}
Vue.prototype.$dateFormat = (...args) => {
  return dateFormat(...args)
}

router.beforeEach((to, from, next) => {
  if ((to.path.includes('/home/money') || to.path.includes('/home/balanceRecord')) && !isSessionIdNull()) {
    next('/')
  } else {
    next()
  }
})

/* eslint-disable no-new */
window.__cpVue__ = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

if (process.env.NODE_ENV === 'production') {
  import('figlet').then((content) => console.log(content))
}
