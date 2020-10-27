// ==========================================================
// IMPORT MODULES
// ==========================================================
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate";
import Notifications from "vue-notification";
import velocity from "velocity-animate";
import Multiselect from "vue-multiselect";
import VueLazyload from "vue-lazyload";
import VueTranslate from "vue-translate-plugin";
import Translations from './Translations.js'
import Store from './Store.js'

// ==========================================================
// USE MODULES
// ==========================================================
Vue.use(BootstrapVue);
Vue.use(IconsPlugin); // Optionally install the BootstrapVue icon components plugin
Vue.use(VueSidebarMenu);
Vue.config.productionTip = false;
Vue.use(VModal, { dynamic: true });
Vue.use(Vuelidate);
Vue.use(VueLazyload);
Vue.use(Notifications, { velocity });
Vue.component("multiselect", Multiselect);
Vue.use(require("vue-moment"));
Vue.use(VueTranslate);
Vue.locales(Translations.get()) // Import language translations


// ==========================================================
// VUE LAZY LOAD
// ==========================================================
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: "../assets/img/error.png",
    loading: "../assets/img/loader_gif.gif",
    attempt: 1,
});

// ==========================================================
// VUEX DATA STORE WITH VuexPersistence PLUGIN - SHARING DATA BETWEEN COMPONENTS ! - VUEX MAGASIN DE DATA - PARTAGER DES DATAS ENTRE LES COMPONENTS 
// ==========================================================

Vue.use(Vuex);
const store = new Vuex.Store(Store)


// ==========================================================
// MOUNTING APP 
// ==========================================================
new Vue({
    router,
    render: (h) => h(App),
    store: store,
}).$mount("#app");