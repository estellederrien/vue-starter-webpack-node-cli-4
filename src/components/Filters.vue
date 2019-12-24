<template>
  <div class="card mb-3 text-center">
    <div class="card-header">
      <label style="padding:5px">
        <!-- test -->
        <b>
          <i class="fas fa-filter"></i> Filtres
        </b>
      </label>
      <button @click="closeModal" class="btn btn-primary float-right">X</button>
    </div>
    <div class="card-body d-flex flex-column">
      <div class="row">
        <div class="col-md-6" style="padding:30px">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" >Role</label>
            </div>
            <select class="form-control" v-model="modifiedFilters.role">
              <option value>Choisir</option>
              <option value="viewer">Viewer</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <br />

          <div class="input-group mb-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" >Jobs</label>
              </div>
              <multiselect
                class="form-control"
                v-model="modifiedFilters.jobs"
                :multiple="true"
                :options="jobs"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                placeholder="Choix multiple"
              ></multiselect>
              <pre class="language-json"><code>{{ value }}</code></pre>
            </div>

            <br />
          </div>
        </div>
        <div class="col-md-6" style="padding:30px">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" >Utilisateur</label>
            </div>
            <multiselect
              class="form-control"
              v-model="modifiedFilters.users"
              :multiple="true"
              :options="users"
              :searchable="true"
              :close-on-select="true"
              :show-labels="false"
              placeholder="Choix multiple"
            ></multiselect>
            <pre class="language-json"><code>{{ value }}</code></pre>
          </div>

          <br />

          <div class="mb-3">
             <div >
             <div class="input-group-prepend">
              <label class="input-group-text" >Age</label>
            </div>
            <vue-slider 
            v-model="modifiedFilters.ageValues"
            :tooltip="'always'"
            :enable-cross="false"
            ></vue-slider>
            </div>
         
          </div>
        </div>
      </div>
      <div class="card-footer float-right">
         <!-- LOADING PIC -->
       
        
        <button class="btn btn-warning float-right mt-auto" v-on:click="filterNow()">
          <i class="fas fa-filter"></i> Filtrer !
           <img v-if="loading" style="width:30px" src="../assets/img/loader_def.gif"></img>
        </button>

        <button
          class="btn btn-primary float-right mt-auto"
          v-on:click="initializeFilters()"
        >Initialiser</button>
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
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: "filters",
  props: ["loading"],
  data() {
    return {
      jobs: [],
      users: [],
      modifiedFilters: {
        ageValues: [18, 60],
        role: "",
        jobs: [],
        users: []
      },
      value: "",

      /* Age range filter */
      min: 0,
      max: 100,
      enableCross: false,
      tooltipMerge: false,
      formatter: value => `Age : ${value}`
    };
  },
  components: {
    Multiselect,
    // VueRangeSlider,
    VueSlider
  },

  methods: {
    getJobs: function() {
      axios
        .post(this.server + "getJobsForFilters")
        .then(response => {
          this.jobs = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUsers: function() {
      axios
        .post(this.server + "getUsersForFilters")
        .then(response => {
          this.users = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filterNow: function() {
      /*   Executing the executeFilters parent function with modifiedFilters as parameters , 
            the executefilters function needs to be called from the component call inside of the parent :  
            <filters  @filters="executeFilters" ></filters> */
       this.loading = true;
      this.$emit("filters", this.modifiedFilters);
     
    },
    initializeFilters: function() {
      this.modifiedFilters = {};
      this.$emit("filters", this.modifiedFilters);
    },
    closeModal: function() {
      this.$modal.hide("filters");
    }
  },
  mounted: function() {
     this.getJobs();
     this.getUsers();
  }
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
</style>