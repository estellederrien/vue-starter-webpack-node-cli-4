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

// https://github.com/euvl/vue-js-modal
import VModal from "vue-js-modal";
Vue.use(VModal, { dialog: true });

import SmartTable from "vuejs-smart-table";

Vue.use(SmartTable);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

// ---------------------------------------------- LINK TO THE Node.JS SERVER ------------------------------------------------------------
Vue.server = Vue.prototype.server = "http://localhost:3000/";
/* Vue.server = Vue.prototype.server =
  "http://vue-starter-literals-node.openode.io/"; */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
