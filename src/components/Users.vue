<template>
<div>
    <div>
        <span v-if="!loaded"><img src="../assets/img/loader_800.gif"></src></span>
    </div>
  <div class="container-fluid" v-show="loaded">
    <div class="row">
      <div class="header">
        <button class="btn btn-warning " v-on:click="openFilters()">
          <i class="fas fa-filter"></i> Filtres
        </button>
      </div>

      <modal name="filters" :width="300" :height="400">
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
              <select class="form-control " v-model="filters.role">
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
              <select class="form-control " v-model="filters.job">
                <option value="">Choisir</option>
                <option v-for="job in jobs" :value="job.name">{{
                  job.name
                }}</option>
              </select>
            </div>
            <br />

            <br />
            <button
              class="btn btn-warning float-right"
              v-on:click="filterNow()"
            >
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

export default {
  name: "Users",

  methods: {
    filterNow: function() {
      this.getUsers();
    },
    initializeFilters: function() {
      this.filters = { role: "", job: "" };
      this.getUsers();
    },
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
    getJobs: function() {
      axios
        .post(this.server + "getJobs")
        .then(response => {
          this.jobs = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created: function() {
    this.getUsers();
    this.getJobs();
  },
  data() {
    return {
      msg: "Welcome to Crypto Info",
      users: [
        {
          nom: "Derrien",
          id: "1",
          img: "img/h1.jpg"
        },
        {
          nom: "Floril",
          id: "2",
          img: "img/f1.jpeg"
        },
        {
          nom: "Daril",
          id: "3",
          img: "img/h2.jpeg"
        }
      ],
      filters: { role: "", job: "" },
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
