import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  //* 登录界面
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  //* 404 not found
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  //* 重定向仪表盘
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页', 
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  //* 博客管理
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/article',
    name: 'Blog',
    meta: { 
      title: '博客管理', 
      icon: 'el-icon-notebook-2'
     },
    children: [
      {
        path: 'article',
        name: 'Article',
        //! 这里需要对应视图中的名字
        component: () => import('@/views/article/Article'),
        meta: { title: '文章管理', icon: 'el-icon-notebook-1' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/category/Category'),
        meta: { title: '分类管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'lable',
        name: 'Lable',
        component: () => import('@/views/lable/Lable'),
        meta: { title: '标签管理', icon: 'el-icon-collection-tag' }
      }
    ]
  },
  //* 广告管理
  {
    path: '/advert',
    component: Layout,
    children: [
      {
        path: 'advert',
        name: 'Advert',
        component: () => import('@/views/advert/Advert'),
        meta: { title: '广告管理', icon: 'el-icon-picture-outline-round' }
      }
    ]
  },
  //* 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/User'),
        meta: { title: '用户管理' },
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/role/Role'),
        meta: { title: '角色管理' },
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/menu/Menu'),
        meta: { title: '菜单管理' },
      },
    ]
  },
  //* 跳转外网
  {
    path: 'github',
    component: Layout,
    children: [
      {
        path: 'https://github.com/coders404',
        meta: { title: '跳转Github', icon: 'link' }
      }
    ]
  },
  //* 刷新当前标签页面 重定向
  {
    path: '/redrect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/Redirect.vue')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
