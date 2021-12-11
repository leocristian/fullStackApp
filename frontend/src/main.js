import Vue from 'vue'
import VueRouter from 'vue-router'
import transition from "transition"

import App from './App.vue'
import Login from "./components/Login.vue"
import Signup from "./components/Signup.vue"
import Dashboard from "./components/Dashboard.vue"
import CompanyProfile from "./components/company/CompanyProfile.vue"
import CompanyForm from "./components/company/CompanyForm.vue"
import ColaboratorForm from "./components/colaborator/ColaboratorForm.vue"
import SendEmail from "./components/SendEmail.vue"
import EditCompany from "./components/company/EditCompany.vue"
import EditColaborator from "./components/colaborator/EditColaborator.vue"

import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/", redirect: "/login"},
    { path: "/dashboard", component: Dashboard},
    { path: "/companyProfile/:id", component: CompanyProfile},
    { path: "/createCompany", component: CompanyForm},
    { path: "/companyProfile/:companyID/createColaborator", component: ColaboratorForm},
    { path: "/companyProfile/:companyID/sendEmail/:colaboratorID", component: SendEmail},
    { path: "/editCompany/:companyID", component: EditCompany },
    { path: "/companyProfile/:companyID/editColaborator/:colaboratorID", component: EditColaborator}
  ]
})

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  transition,
  render: h => h(App),
}).$mount('#app')
