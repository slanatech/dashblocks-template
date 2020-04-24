import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from './layouts/mainlayout.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';
import DashblocksShowcase from './views/DashblocksShowcase.vue';
import Typography from './views/typography.vue';
import MaterialIcons from './views/materialicons.vue';
import ChartJsShowcase from './views/ChartJsShowcase.vue';
import Dygraphs from './views/Dygraphs.vue';
import Mdi from './views/mdi.vue';

import Login from './pages/login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'showcase',
          component: DashblocksShowcase
        },
        {
          path: '/chartjs',
          name: 'chartjs',
          component: ChartJsShowcase
        },
        {
          path: '/dygraphs',
          name: 'dygraphs',
          component: Dygraphs
        },
        {
          path: '/typography',
          name: 'typography',
          component: Typography
        },
        {
          path: '/mdi',
          name: 'mdi',
          component: Mdi
        },
        {
          path: '/icons',
          name: 'icons',
          component: MaterialIcons
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
});
