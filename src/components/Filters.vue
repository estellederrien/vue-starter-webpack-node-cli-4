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
        <div class="col-md-12" style="padding:30px">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Role</label>
            </div>
            <select class="form-control" v-model="filtersChanged.role">
              <option value>Choisir</option>
              <option value="viewer">Viewer</option>
              <option value="user">User</option>
              <option value="administrator">Administrator</option>
            </select>
          </div>
          <br />

          <!--   <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01"
                  >Emploi</label
                >
              </div>
              <select class="form-control " v-model="filtersChanged.job2">
                <option value="">Choisir</option>
                <option v-for="job in jobs" :value="job.name">{{
                  job.name
                }}</option>
              </select>
              
          </div>-->
          <br />

          <div class="input-group mb-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Jobs</label>
              </div>
              <multiselect
                class="form-control"
                v-model="filtersChanged.jobs"
                :multiple="true"
                :options="jobs"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                placeholder="Pick a value"
              ></multiselect>
              <pre class="language-json"><code>{{ value }}</code></pre>
            </div>

            <br />
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

export default {
  name: "filters",
  data() {
    return {
      jobs: [],
      filtersChanged: {
        role: "",
        jobs: []
      },
      value: "",
      options: [
        "Select option",
        "options",
        "selected",
        "mulitple",
        "label",
        "searchable",
        "clearOnSelect",
        "hideSelected",
        "maxHeight",
        "allowEmpty",
        "showLabels",
        "onChange",
        "touched"
      ]
    };
  },
  components: {
    multiselect: Multiselect
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
    filterNow: function() {
      /*   Executing the executeFilters parent function with filtersChanged as parameters , 
            the executefilters function needs to be called from the component call inside of the parent :  
            <filters  @filters="executeFilters" ></filters> */

      this.$emit("filters", this.filtersChanged);
    },
    initializeFilters: function() {
      this.filtersChanged = {};
      this.$emit("filters", this.filtersChanged);
    },
    closeModal: function() {
      this.$modal.hide("filters");
    }
  },
  mounted: function() {
    this.getJobs();
  }
};
</script>
<style scoped>
.multiselect--active {
  z-index: 10000;
}
</style>