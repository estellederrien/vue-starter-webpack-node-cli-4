<template>
<div>
    <div>
        <span v-if="!loaded"><img src="../assets/img/loader_800.gif" class="loader"></src></span>
    </div>
    <div class="container-fluid" v-show="loaded">
        <div class="row">
             <modal name="filters"   width="80%" height="auto" :scrollable="true">
                <filters @filters="executeFilters"></filters>
            </modal>

            <div class="header">
                <button class="btn btn-warning " v-on:click="openFilters()">
                    <i class="fas fa-filter"></i> Filtres
                </button>
            </div>

           

            <div v-if="!users.length">
                <center>
                    <h1>Pas de résultats avec ce filtre !</h1>
                </center>
            </div>
            <div>

            </div>

            <div id="users" v-for="user in users" class="col-sm col-xs-12">
                <div class="card " style="margin-bottom : 20px;min-width: 16rem;max-width:50vh">
                    <img v-bind:src="server + 'img/' + user.img" @error="replaceByDefault" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">{{ user.nom }}</h5>
                        <h6 >{{ user.job}}</h6>
                        <p class="card-text">

                            <div class="nav nav nav-pills mb-12" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a class="nav-link active" id="v-pills-home-tab " data-toggle="pill" :href="'#v-pills-home' + user._id" role="tab" :aria-controls="'v-pills-home' + user._id" aria-selected="true"><i class="fas fa-info"></i></a>
                                <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" :href="'#v-pills-profile' + user._id" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fas fa-file"></i></a>

                            </div>

                            <div class="tab-content" id="v-pills-tabContent">

                                <div class="tab-pane fade show active" :id="'v-pills-home' + user._id" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    {{ user.mentra }}<br />
                                    Age: {{ user.age }}
                                </div>

                                <div class="tab-pane fade" :id="'v-pills-profile' + user._id" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <div class="filesList">
                                        <span class="badge badge-warning" v-for="f in user.filenames">
                                            {{ f.filename }}</span>
                                    </div>

                                </div>

                            </div>

                        </p>
                        <a v-on:click="route(user._id)" class="btn btn-primary float-right"><i class="fas fa-user"></i></a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* GITHUB COMPONENTS */
import axios from "axios";
axios.defaults.withCredentials = true;

/* PERSONNAL COMPONENTS */
import Filters from "@/components/Filters.vue";

export default {
    name: "Users",

    methods: {

        replaceByDefault(e) {
            e.target.src = this.server + "defaut.png";
        },
        route: function (_id) {
            this.$router.push("/user/" + _id);
        },
        getUsers: function () {

            axios
                .post(this.server + "getUsers", {
                    filters: this.filters
                })
                .then(response => {
                    this.users = response.data;
                    this.loaded = true;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        openFilters: function () {
            this.$modal.show("filters");
        },
        executeFilters: function (filtersChanged) {
            this.filters = filtersChanged;
            this.getUsers();

        }
    },

    components: {
        filters: Filters
    },
    created: function () {
        this.getUsers();

    },
    data() {
        return {
            msg: "Welcome to Crypto Info",
            users: [],
            filters: {},
            jobs: [],
            loaded: false
        };
    }
};
</script>

<style scoped>
.header {
    position: fixed;
    /* fixing the position takes it out of html flow - knows
                    nothing about where to locate itself except by browser
                    coordinates */
    left: 0;
    /* top left corner should start at leftmost spot */
    top: 50px;
    /* top left corner should start at topmost spot */
    width: 100vw;
    /* take up the full browser width */
    z-index: 200;
    /* high z index so other content scrolls underneath */
    height: 20vh;
    /* define height for content */

    padding: 15px;
    margin-left: 30px;
}

.filesList {
    width: 100%;
    max-height: 100px;
    overflow: auto;
}

.tab-pane {
    background-color: lightgrey;
    min-height: 100px;
    height: 100px;
    overflow: auto;
}

h6{
    color:#0068d9
}



</style>
