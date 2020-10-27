// ==========================================================
// VUEX DATA STORE WITH VuexPersistence PLUGIN - SHARING DATA BETWEEN COMPONENTS ! - VUEX MAGASIN DE DATA - PARTAGER DES DATAS ENTRE LES COMPONENTS 
// ==========================================================

/* INFORMATION : HOW TO USE IN COMPONENTS - COMMENT UTILISER CA DANS LES COMPONENTS  : SET USER ( WHEN YOU LOG IN): this.$store.commit('setUser', response.data) GET USER : this.User = this.$store.getters.user DELETE USER (WHEN YOU LOG OUT ): this.$store.commit('deleteUser') - START ACTION : store.dispatch('increment')*/
import axios from 'axios';
import VuexPersistence from 'vuex-persist'

const resource_uri = "http://localhost:3000/task/";
const anonymous = { _id: "anonymous", nom: "anonymous", prenom: "anonymous", phone: "", email: "anonymous@anonymous.fr", password: "", img: "", filenames: [] };

const state = {
    user: anonymous,
    logged: false,
    usersFilters: {
        ageValues: [18, 60],
        role: "",
        jobs: [],
        users: [],
        groups: []
    }
};

const getters = {
    user: (state) => {
        return state.user;
    },
    usersFilters: (state) => {
        return state.usersFilters;

    }
};

const actions = {
    async fetchTasks({ commit }) {
        const response = await axios.get(resource_uri);
        commit('setTasks', response.data);
    },
    async addTask({ commit }, task) {
        const response = await axios.post(resource_uri, task);
        commit('newTask', response.data);
    },
    async updateTask({ commit }, task) {
        const response = await axios.put(`${resource_uri}${task.id}`, task);
        commit('updTask', response.data);
    },
    async removeTask({ commit }, task) {
        const response = await axios.delete(`${resource_uri}${task.id}`);
        commit('deleteTask', task);
    }
};

const mutations = {
    setUser(state, user) {
        state.user = user;
        state.logged = true;
    },
    deleteUser(state, user) {
        localStorage.removeItem("user");
        state.logged = false;
        state.user = anonymous;
    },
    setUsersFilters(state, usersFilters) {
        state.usersFilters = usersFilters;
    },
    deleteUsersFilters(state, userFilters) {
        localStorage.removeItem("usersFilters");
        state.userFilters = {
            ageValues: [18, 60],
            role: "",
            jobs: [],
            users: [],
            groups: []
        }
    }
};

/* const vuexLocal = new VuexPersistence({
    storage: window.localStorage
}) */

export default {
    state,
    getters,
    actions,
    mutations,
    plugins: [new VuexPersistence().plugin]
}