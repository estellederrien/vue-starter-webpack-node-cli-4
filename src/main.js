import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueSidebarMenu);
Vue.config.productionTip = false;

// https://github.com/euvl/vue-js-modal
import VModal from "vue-js-modal";
Vue.use(VModal, { dynamic: true });

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import Notifications from "vue-notification";
import velocity from "velocity-animate";

import Multiselect from "vue-multiselect";

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(Notifications, { velocity });

Vue.component("multiselect", Multiselect);

// ---------------------------------------------- VUE LAZY LOAD -----------------------------------------------------------------------------------


Vue.use(VueLazyload, {
        preLoad: 1.3,
        error: '../assets/img/error.png',
        loading: '../assets/img/loader_gif.gif',
        attempt: 1
    })
    // ------------------------------------------ END VUE LAZY LOAD ---------------------------------------------------------------------------


// ---------------------------VUEX DATA STORE - SHARING DATA BETWEEN COMPONENTS ! - VUEX MAGASIN DE DATA - PARTAGER DES DATAS ENTRE LES COMPONENTS -----------------------------------------------

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user') || "{}"),
        logged: false
    },
    mutations: {
        setUser(state, user) {
            localStorage.setItem("user", JSON.stringify(user))
            state.logged = true;
        },
        deleteUser(state, user) {
            console.log("USER DELETED");
            localStorage.removeItem("user");
            state.user = {};
            state.logged = false;

        }
    },
    getters: {
        user: state => {
            return state.user
        }
    }
});


// ---------------------------------------------- END VUEX DATA STORE - SHARING DATA BETWEEN COMPONENTS !-------------------------------------


// ---------------------------------------------- MOUNTING APP  --------------------------------------------------
new Vue({
    router,
    render: h => h(App),
    store: store
}).$mount("#app");