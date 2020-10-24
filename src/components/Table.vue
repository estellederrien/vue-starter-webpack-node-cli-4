<template>
<div class="container-fluid list-template">
    <div class="row">
        <div class="col-md-6 col-xs-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Utilisateurs</h5>
                    <label>Filter by Name:</label>
                    <input class="form-control" v-model="filters.nom.value" />
                    <v-table :data="users" :filters="filters" class="table table-hover" :currentPage.sync="currentPage" :pageSize="5" @totalPagesChanged="totalPages = $event">
                        <thead slot="head">
                            <v-th sortKey="prenom">Prénom</v-th>
                            <v-th sortKey="nom">Nom</v-th>
                            <v-th sortKey="age">Age</v-th>
                            <th>Email</th>
                            <th>Picture</th>
  
                        </thead>
                        <tbody slot="body" slot-scope="{displayData}">
                            <tr v-for="u in displayData" :key="u._id">
                                <td>{{ u.prenom}}</td>
                                <td>{{ u.nom}}</td>
                                <td>{{ u.age }}</td>
                                <td>{{ u.email }}</td>
                                <td>
                                    <img v-if="u.img !== ''" v-lazy="u.img" class="small-img" alt="..." />
                                    <img v-if="u.img == ''" src="../assets/img/defaut.png" class="small-img" alt="..." />
                                </td>
                            
                            </tr>
                        </tbody>
                    </v-table>
                    <smart-pagination :currentPage.sync="currentPage" :totalPages="totalPages" />
                </div>
            </div>
        </div>
        <div class="col-md-6 col-xs-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Groupes</h5>
                    <v-table :data="users2" :filters="filters2" class="table table-hover table-dark" :currentPage.sync="currentPage2" :pageSize="5" @totalPagesChanged="totalPages2 = $event">
                        <thead slot="head">
                            <v-th>Nom</v-th>
                            <v-th>Teams</v-th>
                            <!-- <v-th>Files</v-th> -->
                        </thead>
                        <tbody slot="body" slot-scope="{displayData}">
                            <tr v-for="u in displayData" :key="u._id">
                                <td>{{ u.nom}}</td>
                                <td><span v-for="g in u.groups" class ="badge badge-warning">{{g}}</span></td></td>
                                <!-- <td><span v-for="f in u.filenames" class ="">{{f.originalname}}</span></td> -->
                            </tr>
                        </tbody>{
                    </v-table>
                    <smart-pagination :currentPage.sync="currentPage2" :totalPages="totalPages2" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Vue from "vue";
import SmartTable from "vuejs-smart-table";
Vue.use(SmartTable);
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
    data: () => ({
        users: [],
        users2: [],
        filters: {
            nom: {
                value: "",
                keys: ["nom"]
            }
        },
        currentPage: 1,
        totalPages: 0,
        currentPage2: 1,
        totalPages2: 0
    }),
    name: "Table",
    props: {},
    methods: {
        readUsers: function () {
            axios
                .post("/readUsers", {})
                .then((response) => {
                    this.users = response.data;
                    this.users2 = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        nameLength(row) {
            return `row.name.length`
        }
    },
    mounted: function () {
        this.readUsers();
    }
};
</script>
<style>
.small-img {
    width: 50px;
    height: 50px;
}
</style>
