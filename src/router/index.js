import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:pathWacth',
      name: 'notfound',
      component: () => import('../views/NotFound.vue'),
    },
    {
      path: '/doa',
      name: 'doa',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
