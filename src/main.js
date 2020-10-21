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
import Translations from './translations.js'

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
// VUEX DATA STORE - SHARING DATA BETWEEN COMPONENTS ! - VUEX MAGASIN DE DATA - PARTAGER DES DATAS ENTRE LES COMPONENTS 
// ==========================================================
/* INFORMATION : HOW TO USE IN COMPONENTS - COMMENT UTILISER CA DANS LES COMPONENTS  : SET USER ( WHEN YOU LOG IN): this.$store.commit('setUser', response.data) GET USER : this.User = this.$store.getters.user DELETE USER (WHEN YOU LOG OUT ): this.$store.commit('deleteUser') - START ACTION : store.dispatch('increment')*/
Vue.use(Vuex);
import axios from 'axios'
const anonymous = { _id: "anonymous", nom: "anonymous", prenom: "anonymous", phone: "", email: "anonymous@anonymous.fr", password: "", img: "", filenames: [] };
const store = new Vuex.Store({
    state: {
        user: anonymous,
        logged: false,
    },
    mutations: {
        setUser(state, user) {
            localStorage.setItem("user", JSON.stringify(user));
            state.user = JSON.parse(localStorage.getItem("user"));
            state.logged = true;
        },
        deleteUser(state, user) {
            console.log("USER LOCALSTORAGE SESSION DELETED");
            localStorage.removeItem("user");
            state.logged = false;
            state.user = anonymous;
        }
    },
    actions: {
        loadUsers({ commit }) {
            // EXEMPLE CODE - Actions is used for Async DB calls- On utilise actions pour faire des lecture en bdd
            // https://stackoverflow.com/questions/48455175/how-to-get-data-from-api-in-vuex-using-axios/48458134
            // CALLIN IN COMPONENTS this.$store.dispatch('loadUsers')
            //    .then((result) => {
            //        //handle the returened data
            // })   
            axios
                .get('/users')
                .then(users => {
                    console.log(users)
                        // console.log(response.data, this)
                    commit('setUsers', users)
                    commit('changeLoadingState', false)
                })

        }
    },
    getters: {
        user: (state) => {
            return state.user;
        },
    },
});

// ==========================================================
// MOUNTING APP 
// ==========================================================
new Vue({
    router,
    render: (h) => h(App),
    store: store,
}).$mount("#app");