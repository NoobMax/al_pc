import Vue from 'vue'
import Router from 'vue-router'
import GamesChild from './Games'
import MoneyChild from './MoneyMag'
import HomeRoute from '@/pages/home-route'
import Download from '@/pages/download'
import Userset from '@/pages/userset'
import store2 from 'store2'
const GamesRoute = () => import('@/pages/Games')
const History = () => import('@/pages/History')
const Rules = () => import('@/pages/Rules')
const BalanceRecord = () => import('@/pages/BalanceRecord')
const Betting = () => import('@/pages/Betting')
const Money = () => import('@/pages/MoneyMag/money_route')
const Bank = () => import('@/pages/Bank')
const IndexRoute = () => import('@/pages/index')
const About = () => import('@/pages/Index/about')
const Question = () => import('@/pages/Index/question')
const JOIN = () => import('@/pages/Index/join')
const Notify = () => import('@/pages/Index/notify')
const Media = () => import('@/pages/Index/media')
const beforeEnter = (to, from, next) => !store2.session.get('user-info') ? next('/') : next()

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: IndexRoute,
      name: 'index'
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/join',
      component: JOIN,
      name: 'join'
    },
    {
      path: '/notify',
      component: Notify,
      name: 'notify'
    },
    {
      path: '/download',
      component: Download,
      name: 'download'
    },
    {
      path: '/media',
      component: Media,
      name: 'media'
    },
    {
      path: '/about',
      component: About,
      name: 'about'
    },
    {
      path: '/question',
      component: Question,
      name: 'question'
    },
    {
      path: '/home',
      component: HomeRoute,
      beforeEnter: beforeEnter,
      children: [
        {
          path: 'games',
          component: GamesRoute,
          redirect: 'games/pk10',
          children: GamesChild
        },
        {
          path: 'history',
          component: History,
          name: 'history'
        },
        {
          path: 'betting',
          component: Betting,
          query: 'type',
          name: 'betting'
        },
        {
          path: 'userset',
          query: 'id',
          component: Userset,
          name: 'userset'
        },
        {
          path: 'rules',
          component: Rules,
          name: 'rules'
        },
        {
          path: 'balanceRecord',
          component: BalanceRecord,
          name: 'balanceRecord'
        },
        {
          path: 'betting/all',
          component: Betting,
          name: 'all'
        },
        {
          path: '/home/money',
          component: Money,
          children: MoneyChild
        },
        {
          path: '/home/bank',
          component: Bank,
          name: 'bank'
        }
      ]
    }
  ]
})
