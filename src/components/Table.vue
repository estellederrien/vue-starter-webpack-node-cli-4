<template>
<div class="container-fluid list-template">

    <div class="row">

        <div class="col-md-6 col-xs-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Utilisateurs</h5>
                    <div>
                        <label>Filter by Name:</label>
                        <input class="form-control" v-model="filters.name.value" />
                        <v-table :data="users" :filters="filters" class="table table-hover table-dark">
                            <thead slot="head">
                                <v-th sortKey="name">Name</v-th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Address</th>
                            </thead>
                            <tbody slot="body" slot-scope="{displayData}">
                                <tr v-for="row in displayData" :key="row.id">
                                    <td>{{ row.name }}</td>
                                    <td>{{ row.age }}</td>
                                    <td>{{ row.email }}</td>
                                    <td>
                                        {{ row.address.street }},
                                        {{ row.address.city }}
                                        {{ row.address.state}}
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6 col-xs-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Projets</h5>
                    <div>
                        <label>Filter by Name:</label>
                        <input class="form-control" v-model="filters.name.value" />
                        <v-table :data="users" :filters="filters" class="table table-hover table-dark">
                            <thead slot="head">
                                <v-th sortKey="name">Name</v-th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Address</th>
                            </thead>
                            <tbody slot="body" slot-scope="{displayData}">
                                <tr v-for="row in displayData" :key="row.id">
                                    <td>{{ row.name }}</td>
                                    <td>{{ row.age }}</td>
                                    <td>{{ row.email }}</td>
                                    <td>
                                        {{ row.address.street }},
                                        {{ row.address.city }}
                                        {{ row.address.state}}
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
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

export default {
    data: () => ({
        users: [{
                name: "fesfes",
                age: 45,
                email: "fge",
                address: "fzqfqzf"
            },
            {
                name: "rzrrr",
                age: 24,
                email: "fge",
                address: "fzqfqzf"
            }
        ],
        filters: {
            name: {
                value: "",
                keys: ["name"]
            }
        }
    }),
    name: "Table",
    props: {},
    methods: {}
};
</script>

<style>
</style>
