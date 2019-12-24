<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <i class="fas fa-plus"></i> Créer un groupe
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">Ajoutez des utisateurs</h6>
          <br />
          <br />
          <div class="row">
            <div class="col-md-3">
              <label>Nom</label>
            </div>
            <div class="col-md-9">
              <input
                v-model="group.name"
                type="text"
                class="form-control"
                placeholder="Tapez le nom du groupe"
                aria-label="Tapez le nom du groupe"
                aria-describedby="button-addon1"
              />
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-3">
              <label>Utilisateurs</label>
            </div>

            <div class="col-md-9">
              <multiselect
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
          </div>
          <br />
        </div>
        <!-- END CARD BODY -->
        <div class="card-footer text-right">
          <div class>
            <button v-if="updateMode" class="btn btn-success" @click="newOne()">Nouveau</button>
            <button v-if="updateMode" class="btn btn-danger" @click="deleteGroup(group)">X</button>
            <button class="btn btn-primary" @click="createGroup()">
              <i class="far fa-save"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Liste des groupes</h5>
          <h6 class="card-subtitle mb-2 text-muted">Cliquez pour modifier</h6>
          <br />
          <br />

          <table class="table table-bordered">
            <tbody class="groups-table">
              <tr v-for="group in groups">
                <th>
                  <button @click="readGroup(group)" class="btn-block btn btn-secondary">
                    <div style="text-align:left;">
                      <i class="fas fa-users"></i>
                    </div>
                    {{group.name}}
                  </button>
                </th>
                <th>
                  <span v-for="user in group.users" class="badge badge-primary">
                    -
                    <i class="far fa-user"></i>
                    {{user}} -
                  </span>
                </th>
                <th>{{group.date_creation}}</th>
              </tr>
            </tbody>
          </table>
        </div>
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
            this.groups.push(this.group);
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
      }
    },
    readGroup: function(group) {
      console.log(group);
      axios
        .post(this.server + "readGroup", {
          _id: group._id
        })
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
      this.updateMode = false;
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
<style >
.groups-table {
  display: block;
  border: 1px solid green;
  height: 400px;
  overflow-y: scroll;
}
</style>