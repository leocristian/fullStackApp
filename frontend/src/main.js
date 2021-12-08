import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Login from "./components/Login.vue"
import Dashboard from "./components/Dashboard.vue"
import CompanyProfile from "./components/CompanyProfile.vue"
import CompanyForm from "./components/CompanyForm.vue"

import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: "/login", component: Login },
    { path: "/", redirect: "/login"},
    { path: "/dashboard", component: Dashboard},
    { path: "/companyProfile/:id", component: CompanyProfile},
    { path: "/createCompany", component: CompanyForm}
  ]
})

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
