import { createRouter, createWebHistory } from 'vue-router'

import { userRoutes } from './routes/userRoutes'
import { bouquetRoutes } from './routes/bouquetRoutes'
import { homeRoutes } from './routes/homeRoutes'
import { notFoundRoutes } from './routes/notFoundRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...userRoutes,
    ...bouquetRoutes,
    ...notFoundRoutes
  ],
})

export default router
