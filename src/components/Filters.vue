<template>
  <div class="card mb-3 text-center">
    <div class="card-header">
      <label style="padding:5px">
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
              <label class="input-group-text" for="inputGroupSelect01">Role</label>
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
                <label class="input-group-text" for="inputGroupSelect01">Jobs</label>
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
              <label class="input-group-text" for="inputGroupSelect01">Utilisateur</label>
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
            <vue-range-slider
              v-model="agevalue"
              :min="min"
              :max="max"
              :formatter="formatter"
              :tooltip-merge="tooltipMerge"
              :enable-cross="enableCross"
            ></vue-range-slider>
          </div>
        </div>
      </div>
      <div class="card-footer float-right">
        <button class="btn btn-warning float-right mt-auto" v-on:click="filterNow()">
          <i class="fas fa-filter"></i> Filtrer !
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

// https://github.com/xwpongithub/vue-range-slider
import "vue-range-component/dist/vue-range-slider.css";
import VueRangeSlider from "vue-range-component";

export default {
  name: "filters",
  data() {
    return {
      agevalue: [18, 60],
      jobs: [],
      users: [],
      modifiedFilters: {
        role: "",
        jobs: [],
        users: []
      },
      value: ""
    };
  },
  components: {
    Multiselect,
    VueRangeSlider
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
    this.min = 0;
    this.max = 100;
    this.enableCross = false;
    this.tooltipMerge = false;
    this.formatter = value => `Age : ${value}`;
  }
};
</script>
<style scoped>
.multiselect--active {
  z-index: 10000;
}
.slider {
  /* overwrite slider styles */
  width: 400px;
}
.app-content {
  padding: 40px 15px;
}
</style>