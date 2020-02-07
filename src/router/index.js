import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'tab-bar',
    component: () => import('@/views/login')

  },
  {
    path: '/',
    name: 'tab-bar',
    component: () => import('@/views/tabbar'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }, {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    props: true// 讲路由参数动态映射到组建的props中
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat'),
    props: true// 讲路由参数动态映射到组建的props中
  },
  // {
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user')

  },
  {
    path: '/search',
    name: 'serach',
    component: () => import('@/views/search')

  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true// 讲路由参数动态映射到组建的props中
  },
  {
    path: '/my-article/:type?',
    name: 'my-article',
    component: () => import('@/views/user-article'),
    props: true// 讲路由参数动态映射到组建的props中
  }

  //   path: '/my-article/collect',
  //   component: () => import('@/views/user-article'),
  //   name: 'my-article-collect',
  //   props: true// 讲路由参数动态映射到组建的props中
  // },
  // {
  //   path: '/my-article/history',
  //   component: () => import('@/views/user-article'),
  //   name: 'my-article-history',
  //   props: true// 讲路由参数动态映射到组建的props中
  // }

]

const router = new VueRouter({
  routes
})

export default router
