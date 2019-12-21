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
          placeholder="Ajouter un Groupe"
          aria-label="Ajouter un Groupe"
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

      <button class="btn btn-primary" @click="createGroup()">Sauver</button>
    </div>
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
      value: ""
    };
  },
  methods: {
    createGroup: function() {
      alert("ok");
      axios
        .post(this.server + "createGroup", this.group)
        .then(response => {
          this.$notify({
            type: "success",
            group: "foo",
            title: "Hey! ",
            text: "Groupe created"
          });
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
    readGroup: function() {
      axios
        .post(this.server + "readGroup")
        .then(response => {
          this.group = response.data;
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
      axios
        .post(this.server + "deleteGroup", this.group)
        .then(response => {
          this.$notify({
            type: "success",
            group: "foo",
            title: "Hey! ",
            text: "Groupe deleted"
          });
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
    }
  },
  mounted: function() {
    this.getUsersForFilters();
  }
};
</script>
