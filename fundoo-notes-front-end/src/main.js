import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import AxiosPlugin from 'vue-axios-cors';
 
Vue.use(AxiosPlugin)
Vue.use(Vuelidate)
/* Vue.config.productionTip = false */
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
