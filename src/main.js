import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import VueApexCharts from "vue-apexcharts";
Vue.component("apexchart", VueApexCharts);

Vue.use(VueSidebarMenu);
Vue.config.productionTip = false;

// Vue.server = Vue.prototype.server = "http://localhost/";
Vue.server = Vue.prototype.server =
  "http://vue-starter-literals-node.openode.io/";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
