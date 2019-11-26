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
/* Localhost */
Vue.server = Vue.prototype.server = "http://localhost:80/";

/* OPENODE.IO */
// Vue.server = Vue.prototype.server =
//   "http://vue-starter-webpack-cli-4-node.openode.io/";

/* Google cloud */
/* Vue.server = Vue.prototype.server =
  "https://cedar-network-259109.appspot.com:8080/"; */
// "http://localhost:8080/";

// ---------------------------------------------- STORING MONGODB ID AS GLOBAL FOR PROFILE , THIS VAR IS POPULATED WHEN A USER LOGS IN for the PROFILE MENU TO APPEAR IN THE TOPBAR
// ---------------------------------------------- VUEX WILL BE BETTER LATER

let globalData = new Vue({
  data: { $userid: "" }
});

Vue.mixin({
  computed: {
    $userid: {
      get: function() {
        return globalData.$data.$userid;
      },
      set: function(userid) {
        globalData.$data.$userid = userid;
      }
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
