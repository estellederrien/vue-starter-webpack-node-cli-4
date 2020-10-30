<template>
<div class="card mb-3 text-center ">
    <div class="card-header">
        <label style="padding:5px">
            <!-- test -->
            <b> <i class="fas fa-filter"></i> {{ t('FILTERS') }} </b>
        </label>
        <button @click="closeModal" class="btn btn-primary float-right">X</button>
        <div>
            <b-card no-body bg-variant="light">
                <b-tabs bg-variant="light">
                    <b-tab active style="padding:20px">
                        <template #title>
                            <b-icon icon="filter" aria-hidden="true"></b-icon> Standard</strong>
                        </template>

                        <b-form-group label-cols-lg="3" label="Résumé" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0">
                            <b-form-group label-cols-sm="3" label="User:" label-align-sm="right" label-for="nested-street">
                                <select class="form-control" v-model="usersFilters.role">
                                    <option value>{{ t('CHOOSE') }} </option>
                                    <option value="viewer">Viewer</option>
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </b-form-group>
                            <b-form-group label-cols-sm="3" label="Jobs:" label-align-sm="right" label-for="jobs">
                                <multiselect class="form-input" v-model="usersFilters.jobs" :multiple="true" :options="jobs" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Choix multiple"></multiselect>
                                <pre class="language-json"><code>{{ value}}</code></pre>
                            </b-form-group>
                            <b-form-group label-cols-sm="3" label="Teams:" label-align-sm="right" label-for="teams">
                                <multiselect class="form-input" v-model="usersFilters.groups" :multiple="true" :options="groups" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Choix multiple"></multiselect>
                                <pre class="language-json"><code>{{ value }}</code></pre>
                            </b-form-group>
                             <b-form-group label-cols-sm="3" label="Users:" label-align-sm="right" label-for="users">
                                <multiselect class="form-input" v-model="usersFilters.users" :multiple="true" :options="users" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Choix multiple"></multiselect>
                                    <pre class="language-json"><code>{{ value }}</code></pre>
                            </b-form-group>
                             <b-form-group label-cols-sm="3" label="Age:" label-align-sm="right" label-for="age">
                               <vue-slider v-model="usersFilters.ageValues" :tooltip="'always'" :enable-cross="false"></vue-slider>
                              </b-form-group>
                           

                        </b-form-group>
                    </b-tab>
                    <b-tab style="padding:20px">
                        <template #title>
                            <b-icon icon="bar-chart-line-fill  " aria-hidden="true"></b-icon> Sorting
                        </template>
                        <b-form-group label-cols-lg="3" label="Sorting : Comin' soon" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0">
                            <b-form-group label-cols-sm="3" label="Street:" label-align-sm="right" label-for="nested-street">
                                <b-form-input id="nested-street"></b-form-input>
                            </b-form-group>

                            <b-form-group label-cols-sm="3" label="City:" label-align-sm="right" label-for="nested-city">
                                <b-form-input id="nested-city"></b-form-input>
                            </b-form-group>

                            <b-form-group label-cols-sm="3" label="State:" label-align-sm="right" label-for="nested-state">
                                <b-form-input id="nested-state"></b-form-input>
                            </b-form-group>

                            <b-form-group label-cols-sm="3" label="Country:" label-align-sm="right" label-for="nested-country">
                                <b-form-input id="nested-country"></b-form-input>
                            </b-form-group>

                            <b-form-group label-cols-sm="3" label="Ship via:" label-align-sm="right" class="mb-0">
                                <b-form-radio-group class="pt-2" :options="['Air', 'Courier', 'Mail']"></b-form-radio-group>
                            </b-form-group>
                        </b-form-group>
                    </b-tab>
                    <b-tab style="padding:20px">
                        <template #title>
                            <b-icon icon="box-seam" aria-hidden="true"></b-icon> Dynamic
                        </template>
                        <b-card-text>Comin soon 3</b-card-text>
                    </b-tab>
                    <b-tab style="padding:20px">
                        <template #title>
                            <b-icon icon="bricks" aria-hidden="true"></b-icon> Generated
                        </template>
                        <b-card-text>Comin soon 4</b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
        <div class="card-footer float-right">
            <!-- LOADING PIC -->
            <button class="btn btn-warning float-right mt-auto" v-on:click="filterNow()">
                <i class="fas fa-filter"></i> {{ t('FILTER') }}
                <img v-if="loading" style="width:30px" src="../assets/img/loader_def.gif" />
            </button>
            <button class="btn btn-primary float-right mt-auto" v-on:click="initializeFilters()">{{ t('INITIALIZE') }}</button>
        </div>
    </div>
</div>
</template>

<script>
/* GITHUB COMPONENTS */
import axios from "axios";
axios.defaults.withCredentials = true;
import Multiselect from "vue-multiselect";
// import https://github.com/xwpongithub/vue-range-slider THIS ONE DOESNT WORK
// import "vue-range-component/dist/vue-range-slider.css";
// import VueRangeSlider from "vue-range-component";
// https://nightcatsama.github.io/vue-slider-component/#/basics/simple
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
export default {
    name: "filters",
    props: ["loading"],
    data() {
        return {
            jobs: [],
            users: [],
            groups: [],
            usersFilters: {},
            value: "",
            /* Age range filter */
            min: 0,
            max: 100,
            enableCross: false,
            tooltipMerge: false,
            formatter: (value) => `Age : ${value}`,
        };
    },
    components: {
        Multiselect,
        // VueRangeSlider,
        VueSlider,
    },
    methods: {
        readJobsForFilters: function () {
            axios
                .get("/api/jobs")
                .then(response => {
                    this.jobs = response.data;
                    this.jobs = this.jobs.map(function (item) {
                        return item["name"];
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        readGroupsForFilters: function () {
            axios.post("/readGroupsForFilters")
                .then((response) => {
                    this.groups = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        readUsers: function () {
            axios.post("/readUsersForFilters")
                .then((response) => {
                    this.users = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        filterNow: function () {
            /*   Executing the executeFilters parent function with usersFilters as parameters , 
            the executefilters function needs to be called from the component call inside of the parent :  
            <filters  @filters="executeFilters" ></filters> */
            // Displaying loader
            this.loading = true;
            console.log(this.usersFilters)
            // Storing filters in localStorage, for later displaying - On enregistre les filtres que lutilisateur a choisi dans le localstorage
            // localStorage.setItem('filters', JSON.stringify(this.usersFilters));
            this.$store.commit("setUsersFilters", this.usersFilters)
            // Sending filters to the parent component
            this.$emit("filters", this.usersFilters);
        },
        initializeFilters: function () {
            this.usersFilters = {
                ageValues: [18, 60],
            };
            this.$store.commit("deleteUsersFilters")
            this.$emit("filters", this.usersFilters);
        },
        closeModal: function () {
            this.$modal.hide("filters");
        },
    },
    mounted: function () {
        this.readJobsForFilters();
        this.readUsers();
        this.readGroupsForFilters();
        //Getting filters from vuex store, if they do exist - On va chercher les filtrs dans vuex store si ils ont été utlisés auparavant.
        this.usersFilters = this.$store.getters.usersFilters
    },
};
</script>

<style scoped>
.multiselect--active {
    z-index: 10000;
}

.slider {
    width: 400px;
}

.app-content {
    padding: 40px 15px;
}

.tab-pane {
    min-height: 350px !important;
}

.b-icon {
    margin-right: 5px
}

.col-form-label{
    max-height:80px !important;
}

/* .form-control{
    border:white
}

.label{
    float:left;
} */
/* .input-group {border: 1px solid black;} */
</style>
