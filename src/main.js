// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VuesticPlugin from 'vuestic-theme/vuestic-plugin'
import './i18n'
import VueResource from 'vue-resource'
import toastr from 'toastr'

Vue.use(VuesticPlugin)
Vue.use(VueResource)
Vue.prototype.$toastr = toastr
// Vue.http.interceptors.push(function (request) {
//   return function (resp) {
//     if (resp.status === 401) {
//       this.$router.push('auth/login')
//     } else if (resp.status === 200) {
//       if (resp.data.status.code !== 0) {
//         toastr.error(resp.data.status.message)
//       }
//     } else {
//       toastr.error('Unknow error')
//     }
//   }
// })

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})

sync(store, router)

let mediaHandler = () => {
  if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
    store.dispatch('toggleSidebar', true)
  } else {
    store.dispatch('toggleSidebar', false)
  }
}

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
