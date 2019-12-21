<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-prepend">
            <label class="input-group-text">Nom</label>
          </div>
        </div>
        <input
          v-model="group.name"
          type="text"
          class="form-control"
          placeholder="Tapez le nom du groupe"
          aria-label="Tapez le nom du groupe"
          aria-describedby="button-addon1"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Utilisateurs</label>
        </div>
        <multiselect
          class="form-control"
          v-model="group.users"
          :multiple="true"
          :options="users"
          :searchable="true"
          :close-on-select="true"
          :show-labels="false"
          placeholder="Choix multiple"
        ></multiselect>
        <pre class="language-json"><code>{{ value }}</code></pre>
      </div>
      <div class="text-right">
        <button v-if="updateMode" class="btn btn-success" @click="newOne()">Nouveau</button>
        <button v-if="updateMode" class="btn btn-danger" @click="deleteGroup(group)">X</button>
        <button class="btn btn-primary" @click="createGroup()">
          <i class="far fa-save"></i>
        </button>
      </div>
    </div>

    <div class="col-lg-6">
      <div v-for="group in groups" class="btn-group" role="group" aria-label="Basic example">
        <button class="badge badge-warning btn-block" @click="readGroup(group)">
          <h4>{{group.name}}</h4>:
          <span v-for="user in group.users">- {{user}} -</span>
        </button>
      </div>
    </div>

    <!-- END ROW -->
  </div>
</template>

<script>
/* GITHUB COMPONENTS */
import axios from "axios";
axios.defaults.withCredentials = true;
import Multiselect from "vue-multiselect";

export default {
  name: "Groups",
  data() {
    return {
      group: {
        name: "",
        users: []
      },
      users: [],
      value: "",
      groups: [],
      updateMode: false
    };
  },
  methods: {
    createGroup: function() {
      if (this.updateMode == true) {
        this.updateGroup();
        return;
      } else {
        axios
          .post(this.server + "createGroup", this.group)
          .then(response => {
            this.$notify({
              type: "success",
              group: "foo",
              title: "Hey! ",
              text: "Groupe created"
            });
            this.readGroups();
          })
          .catch(error => {
            console.log(error);
            this.$notify({
              type: "error",
              group: "foo",
              title: "Hey! ",
              text: "Permission is missing ! -> <br> " + error
            });
          });
      }
    },
    readGroup: function(group) {
      console.log(group);
      axios
        .post(this.server + "readGroup", { _id: group._id })
        .then(response => {
          this.group = response.data;
          this.updateMode = true;
        })
        .catch(error => {
          console.log(error);
          this.$notify({
            type: "error",
            group: "foo",
            title: "Hey! ",
            text: "Permission is missing ! -> <br> " + error
          });
        });
    },
    updateGroup: function() {
      axios
        .post(this.server + "updateGroup", this.group)
        .then(response => {
          this.$notify({
            type: "success",
            group: "foo",
            title: "Hey! ",
            text: "Groupe updated"
          });
          this.readGroups();
        })
        .catch(error => {
          console.log(error);
          this.$notify({
            type: "error",
            group: "foo",
            title: "Hey! ",
            text: "Permission is missing ! -> <br> " + error
          });
        });
    },
    deleteGroup: function() {
      if (confirm("Do you really want to delete?")) {
        axios
          .post(this.server + "deleteGroup", this.group)
          .then(response => {
            this.$notify({
              type: "success",
              group: "foo",
              title: "Hey! ",
              text: "Groupe deleted"
            });
            this.readGroups();
          })
          .catch(error => {
            console.log(error);
            this.$notify({
              type: "error",
              group: "foo",
              title: "Hey! ",
              text: "Permission is missing ! -> <br> " + error
            });
          });
      }
    },
    readGroups: function() {
      axios
        .post(this.server + "readGroups")
        .then(response => {
          this.groups = response.data;
        })
        .catch(error => {
          console.log(error);
          this.$notify({
            type: "error",
            group: "foo",
            title: "Hey! ",
            text: "Permission is missing ! -> <br> " + error
          });
        });
    },
    getUsersForFilters: function() {
      axios
        .post(this.server + "getUsersForFilters")
        .then(response => {
          this.users = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    newOne: function() {
      this.updateMode == false;
      this.group = {
        name: "",
        users: []
      };
    }
  },
  mounted: function() {
    this.getUsersForFilters();
    this.readGroups();
  }
};
</script>
