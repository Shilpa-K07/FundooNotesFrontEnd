import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
/* import AxiosPlugin from 'vue-axios-cors' */
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify)
Vue.use(Vuelidate)
/* Vue.use(AxiosPlugin) */
/* Vue.config.productionTip = false */
new Vue({
  vuetify : new Vuetify(),
  render: h => h(App)
}).$mount('#app')
