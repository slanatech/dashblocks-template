import Vue from "vue";
import Router from "vue-router";
//import DygraphsDynamic from "./views/DygraphsDynamic";
//import ChartJsShowcase from "./views/ChartJsShowcase";
import DashblocksShowcase from "./views/DashblocksShowcase";

Vue.use(Router);

export default new Router({
  base: "/dashblocks/", //process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Dashblocks Dashboard",
      component: DashblocksShowcase
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
