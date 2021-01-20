import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import(/* webpackChunkName: "login" */'../components/login')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */'../components/dashboard')
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '',
    routes: [
        {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  }
]
})