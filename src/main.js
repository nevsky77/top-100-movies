import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import ReadMore from 'vue-read-more';
import cutTitle from './helpers/cutTitle'

Vue.directive('cut-title', cutTitle);
Vue.use(ReadMore);
Vue.use(BootstrapVue)
Vue.config.productionTip = false

export const MOVIE_DB_API_KEY = '5a82a72b-8260-4df9-bc51-8029f36e1925'
export const MOVIE_DB_BASE_URI = 'http://www.myapifilms.com/imdb'
export const VUE_APP_CORS_URL = 'https://cors-anywhere.herokuapp.com'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
