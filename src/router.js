import Vue from 'vue';
import Router from 'vue-router';
//import DygraphsDynamic from "./views/DygraphsDynamic";
//import ChartJsShowcase from "./views/ChartJsShowcase";
import DashblocksShowcase from './views/DashblocksShowcase';
import SampleDashboard from './views/SampleDashboard';

Vue.use(Router);

export default new Router({
  base: '/dashblocks-template/',
  routes: [
    {
      path: '/',
      name: 'Dashblocks Dashboard',
      component: DashblocksShowcase
    },
    {
      path: '/sample',
      name: 'Sample Dashboard',
      component: SampleDashboard
    }
    /*
    {
      path: "/dygraphsdynamic",
      name: "Dygraphs - Dynamic Updates",
      component: DygraphsDynamic
    },
    {
      path: "/chartjs",
      name: "Chart.js Showcase",
      component: ChartJsShowcase
    }
    */
  ]
});
