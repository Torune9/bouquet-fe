import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainPageView from '@/views/MainPageView.vue'
import DetailView from '@/views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bouquet',
      name: 'bouquet',
      component: MainPageView,
    },
    {
      path: '/bouquet/:id',
      name: 'detail-bouquet',
      component: DetailView,
    },
  ],
})

export default router
