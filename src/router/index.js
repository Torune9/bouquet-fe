import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainPageView from '@/views/mainPage/MainPageView.vue'
import DetailView from '@/views/mainPage/DetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path : '/sign-in',
      name : 'login',
      component : LoginView
    },
    {
      path : '/sign-up',
      name : 'register',
      component : RegisterView
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
    { 
      path: '/:pathMatch(.*)*', 
      component: NotFoundView 
    }
  ],
})

export default router
