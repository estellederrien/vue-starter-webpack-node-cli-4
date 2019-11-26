<template>
<div>
    <div>
        <span v-if="!loaded"><img src="../assets/img/loader_800.gif" class="loader"></src></span>
    </div>
  <div class="container-fluid" v-show="loaded">
    <div class="row">
      <div class="header">
        <button class="btn btn-warning " v-on:click="openFilters()">
          <i class="fas fa-filter"></i> Filtres
        </button>
      </div>

      <modal name="filters" :width="300" :height="400">
          <filters  @filters="executeFilters" ></filters>
      </modal>

      <div v-for="user in users" class="col-sm col-xs-12">
        <div class="card " style="margin-bottom : 20px;min-width: 16rem;">
          <img
            v-bind:src="server + 'img/' + user.img"
            @error="replaceByDefault"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ user.nom }}</h5>
            <p class="card-text">
              {{ user.mentra }}<br />
              Age: {{ user.age }}
            </p>
            <a v-on:click="route(user._id)" class="btn btn-primary float-right"
              ><i class="fas fa-user"></i
            ></a>
            <div class="filesList">
              <span class="badge badge-warning" v-for="f in user.filenames">
                {{ f.filename }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </div> 
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

import Filters from  "@/components/Filters.vue";

export default {
  name: "Users",

  methods: {
    
    replaceByDefault(e) {
      e.target.src = this.server + "defaut.png";
    },
    route: function(_id) {
      this.$router.push("/user/" + _id);
    },
    getUsers: function() {
      

      axios
        .post(this.server + "getUsers", { filters: this.filters })
        .then(response => {
          this.users = response.data;
          this.loaded = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    openFilters: function() {
      this.$modal.show("filters");
    },
    executeFilters: function(filtersChanged) {
      this.filters = filtersChanged;
      this.getUsers();
    }
  },
  
    components: {
        filters:Filters
    },
  created: function() {
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

<style>
.header {
  position: fixed; /* fixing the position takes it out of html flow - knows
                   nothing about where to locate itself except by browser
                   coordinates */
  left: 0; /* top left corner should start at leftmost spot */
  top: 50px; /* top left corner should start at topmost spot */
  width: 100vw; /* take up the full browser width */
  z-index: 200; /* high z index so other content scrolls underneath */
  height: 20vh; /* define height for content */

  padding: 15px;
  margin-left: 30px;
}
.filesList {
  width: 200px;
  max-width: 200px;
  max-height: 50px;
  overflow: auto;
}
</style>
