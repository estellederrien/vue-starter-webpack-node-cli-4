<template>
  <div>
    <label style="padding:5px"
      ><b><i class="fas fa-filter"></i> Filtres</b></label
    >
    <div class="row">
      <div class="col-md-12 " style="padding:30px">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01"
              >Role</label
            >
          </div>
          <select class="form-control " v-model="filtersChanged.role">
            <option value="">Choisir</option>
            <option value="viewer">Viewer</option>
            <option value="user">User</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
        <br />

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01"
              >Emploi</label
            >
          </div>
          <select class="form-control " v-model="filtersChanged.job">
            <option value="">Choisir</option>
            <option v-for="job in jobs" :value="job.name">{{
              job.name
            }}</option>
          </select>
        </div>
        <br />

        <br />
        <button class="btn btn-warning float-right" v-on:click="filterNow()">
          Filtrer !
        </button>

        <button
          class="btn btn-primary float-right"
          v-on:click="initializeFilters()"
        >
          Initialiser
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "filters",
  data() {
    return {
      jobs: [],
      filtersChanged: { role: "", job: "" }
    };
  },

  methods: {
    getJobs: function() {
      axios
        .post(this.server + "getJobs")
        .then(response => {
          this.jobs = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    filterNow: function() {
      /*   Executing the executeFilters parent function with filtersChanged as parameters , 
      the executefilters function needs to be called from the component call inside of the parent :  
      <filters  @filters="executeFilters" ></filters> */
      this.$emit("filters", this.filtersChanged);
    },
    initializeFilters: function() {
      this.filtersChanged = { role: "", job: "" };
      this.$emit("filters", this.filtersChanged);
    }
  },
  mounted: function() {
    this.getJobs();
  }
};
</script>
