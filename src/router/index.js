import { createWebHistory, createRouter } from "vue-router"

import MainView from '../views/MainView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainView,
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: FavoritesView
    }
  ]
})

export default router