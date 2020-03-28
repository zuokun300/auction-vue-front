import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register'
import Index from '../views/Index'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Index
  },
    {
        path:'/register',
        name:'Register',
        component:Register
    },
    {
        path:'/login',
        name:'Login',
        component:Login
    },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/register') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');

        if (token === null || token === '') {
            next('/register');
        } else {
            next();
        }
    }
});


export default router;
