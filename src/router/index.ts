import { createRouter, createWebHistory } from 'vue-router'
import FlagCatalogView from '@/views/FlagCatalogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FlagCatalogView
    }
  ]
})

export default router
