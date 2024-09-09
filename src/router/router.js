import { createRouter, createWebHistory } from 'vue-router';
import MapView from '../views/MapView.vue';
import ListView from '../views/ListView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Map',
      component: MapView,
    },
    {
      path: '/list',
      name: 'List',
      component: ListView,
    },
  ],
});

export default router;
