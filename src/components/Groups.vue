<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon1"
          @click="insertGroup()"
        >+</button>
      </div>
      <input
        v-model="newGroup"
        type="text"
        class="form-control"
        placeholder="Ajouter un Groupe"
        aria-label="Ajouter un Groupe"
        aria-describedby="button-addon1"
      />
    </div>
  </div>
</template>

<script>
/* GITHUB COMPONENTS */
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "Groups",
  data() {
    return {
      group: {
        name: "",
        users: []
      }
    };
  },
  methods: {
    createGroup: function() {
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
        .post(this.server + "deletedGroup", this.group)
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
    }
  }
};
</script>
