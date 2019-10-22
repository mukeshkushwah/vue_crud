import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Axios from 'axios';
import store from './store'
import Vuelidate from "vuelidate";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Auth from './packages/auth/Auth.js';
import DataTable from 'laravel-vue-datatable';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { ClientTable } from 'vue-tables-2';
Vue.use(ClientTable);


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(Auth);
Vue.use(DataTable);

Vue.prototype.$http = Axios;
const token    = localStorage.getItem('token');
Vue.prototype.$http.defaults.baseURL = 'http://127.0.0.1:8000/api';
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

 new Vue({
  router,
  render: h => h(App),
}).$mount('#app');


