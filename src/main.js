import Vue from "vue";

import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

Vue.use(VueSidebarMenu);
Vue.config.productionTip = false;

// https://github.com/euvl/vue-js-modal
import VModal from "vue-js-modal";
Vue.use(VModal, { dynamic: true });

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import Notifications from "vue-notification";
import velocity from "velocity-animate";
Vue.use(Notifications, { velocity });

Vue.component("multiselect", Multiselect);
import Multiselect from "vue-multiselect";

// ---------------------------------------------- STORING USER AS GLOBAL, THIS VAR IS POPULATED WHEN A USER LOGS IN INSIDE THE LOGIN COMPONENT for the PROFILE MENU TO APPEAR IN THE TOPBAR
// ---------------------------------------------- VUEX WILL BE BETTER LATER

let globalData = new Vue({
  data: { $user: {} }
});


Vue.mixin({
  computed: {
    $user: {
      get: function() {

            return globalData.$data.$user;
    
      },
      set: function(user) {

        globalData.$data.$user = user;
      }
    }
  }
});


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
