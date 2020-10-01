import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";

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

import Multiselect from "vue-multiselect";

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(Notifications, { velocity });

Vue.component("multiselect", Multiselect);
// ---------------------------------------------- VUE LAZY LOAD -----------------------------------------------------------------------------------
// or with options
Vue.use(VueLazyload, {
        preLoad: 1.3,
        error: '../assets/img/error.png',
        loading: '../assets/img/loader_gif.gif',
        attempt: 1
    })
    // ------------------------------------------ END VUE LAZY LOAD ---------------------------------------------------------------------------


// ---------------------------------------------- VUEX DATA STORE - SHARING DATA BETWEEN COMPONENTS !-----------------------------------------------
// ---------------------------------------------- VUEX MAGASIN DE DATA - PARTAGER DES DATAS ENTRE LES COMPONENTS -------------------------------------
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {}
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    getters: {
        user: state => {
            return state.user
        }
    }
});

// ---------------------------------------------- END VUEX DATA STORE - SHARING DATA BETWEEN COMPONENTS !-------------------------------------






// ---------------------------------------------- !!! OLD CODE !!!! STORING USER AS GLOBAL, THIS VAR IS POPULATED WHEN A USER LOGS IN INSIDE THE LOGIN COMPONENT for the PROFILE MENU TO APPEAR IN THE TOPBAR


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
// ---------------------------------------------- END !!! OLD CODE !!!! STORING USER AS GLOBAL, THIS VAR IS POPULATED WHEN A USER LOGS IN INSIDE THE LOGIN COMPONENT for the PROFILE MENU TO APPEAR IN THE TOPBAR


new Vue({
    router,
    render: h => h(App),
    store: store
}).$mount("#app");