import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/reg',
    name: 'teacherReg',
    component: () => import('../views/teacherReg')
  },
  {
    path: '/log_in',
    name: 'teacherLogin',
    component: () => import('../views/teacherLogin')
  },
  {
    path: '/myHome',
    name: 'teacherHome',
    component: () => import('../views/teacherHome')
  },
  {
    path: '/openVote',
    name: 'openVote',
    component: () => import('../views/openVote')
  },
  {
    path: '/openSignIn',
    name: 'openSignIn',
    component: () => import('../views/openSignin')
  },
  {
    path: '/voteResultList',
    name: 'voteResultList',
    component: () => import('../views/voteResultList')
  },
  {
    path: '/signResultList',
    name: 'signResultList',
    component: () => import('../views/signInResultList')
  },
  {
    path: '/voteDetail',
    name: 'voteDetail',
    component: () => import('../views/voteDetail')
  },
  {
    path: '/signDetail',
    name: 'signDetail',
    component: () => import('../views/signDetail')
  },
  {
    path: '/leaveMessage',
    name: 'leaveMessage',
    component: () => import('../views/stuMsg')
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('../views/stuSignIn')
  },
  {
    path: '/vote',
    name: 'vote',
    component: () => import('../views/stuVote')
  },
  {
    path: '/myMsg',
    name: 'myMsg',
    component: () => import('../views/teacherMsg')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
// component: () => import('../views/About.vue')
