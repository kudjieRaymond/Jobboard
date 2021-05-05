import Vue from 'vue';
import VueRouter from 'vue-router';
import Jobs from './views/Jobs';
import store from './store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
		meta: { guest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/Register.vue'),
		meta: { guest: true },
  },
  {
    path: '/',
    name: 'homePage',
    component: Jobs
  },
	{
		path:'/jobs/:id',
		name: 'showJob',
		component: () => import('./views/Job.vue'),
		props:true,
	},
	{
		path:'/external-jobs/:id',
		name: 'showExternalJob',
		component: () => import('./views/ExternalJob.vue'),
		props:true,
	},
	{
    path: '/admin/manage-jobs',
    name: 'jobManager',
    component: () => import('./views/JobManager.vue'),
		meta: {requiresAuth: true},
  },
  
];

const router = new VueRouter({
  routes,
  mode: 'history',
	base: process.env.BASE_URL,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/admin/manage-jobs");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
