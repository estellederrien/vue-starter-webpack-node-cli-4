<template>
<div class="row">
    <div class="col-lg-6">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas fa-plus"></i> {{ t('CREATE_TEAM') }}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ t('ADD_USERS') }}</h6>
                <br />
                <br />
                <div class="row">
                    <div class="col-md-3">
                        <label>{{ t('NAME') }}</label>
                    </div>
                    <div class="col-md-9">
                        <input v-model="group.name" type="text" class="form-control" :placeholder="t('ENTER_NAME') " aria-label="Tapez le nom du groupe" aria-describedby="button-addon1" />
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-3">
                        <label>{{ t('USERS') }}</label>
                    </div>

                    <div class="col-md-9">
                        <multiselect v-model="group.users" :multiple="true" :options="users" :searchable="true" :close-on-select="true" :show-labels="false" :placeholder=" t('MULTIPLE_CHOICE') " track-by="_id" :custom-label="customLabel">
                            <template slot="singleLabel" slot-scope="props">
                                <img class="option__image" :src="props.option.img" alt="No Picture yet" />
                                <span class="option__desc">
                                    <span class="option__title">{{ props.option.prenom}} {{ props.option.nom}}</span>
                                </span>
                            </template>
                            <template slot="option" slot-scope="props">
                                <img class="option__image" :src="props.option.img" alt="Missing picture !" />
                                <div class="option__desc">
                                    <span class="option__title">{{ props.option.prenom}} {{ props.option.nom}}</span>
                                    <span class="option__small">{{ props.option.desc }}</span>
                                </div>
                            </template>
                        </multiselect>
                        <pre class="language-json"><code>{{ value }} </code></pre>
                    </div>
                </div>
                <br />
            </div>
            <!-- END CARD BODY -->
            <div class="card-footer text-right">
                <div class>
                    <button v-if="updateMode" class="btn btn-success" @click="newOne()">{{ t('CREATE_TEAM') }}</button>
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
                <h5 class="card-title">{{ t('GROUPS_LIST') }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ t('CLICK_TO_UPDATE') }}</h6>
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
                                    {{user.nom}} -
                                </span>
                            </th>
                            <th>{{group.creation_date}}</th>
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
        customLabel({
            nom,
            prenom
        }) {
            return `${prenom}  ${nom}  `;
        },
        createGroup: function () {
            if (this.updateMode == true) {
                this.updateGroup();
                return;
            } else {
                axios
                    .post("/createGroup", this.group)
                    .then(response => {
                        this.groups.push(this.group);
                        this.$notify({
                            type: "success",
                            group: "Info",
                            title: "Hey! ",
                            text: this.$translate.text('GROUP_CREATED')
                        });
                        this.updateMode = true;
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            type: "error",
                            group: "Info",
                            title: "Hey! ",
                            text: error
                        });
                    });
            }
        },
        readGroup: function (group) {
            console.log(group);
            axios
                .post("/readGroup", {
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
                        group: "Info",
                        title: "Hey! ",
                        text: error
                    });
                });
        },
        updateGroup: function () {
            axios
                .post("/updateGroup", this.group)
                .then(response => {
                    this.$notify({
                        type: "success",
                        group: "Info",
                        title: "Hey! ",
                        text: this.$translate.text('GROUP_UPDATED')
                    });
                    this.readGroups();
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        type: "error",
                        group: "Info",
                        title: "Hey! ",
                        text: error
                    });
                });
        },
        deleteGroup: function () {
            if (confirm(this.$translate.text('CONFIRM_DELETION'))) {
                axios
                    .post("/deleteGroup", this.group)
                    .then(response => {
                        this.$notify({
                            type: "success",
                            group: "Info",
                            title: "Hey! ",
                            text: this.$translate.text('GROUP_DELETED')
                        });
                        this.readGroups();
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            type: "error",
                            group: "Info",
                            title: "Hey! ",
                            text: error
                        });
                    });
            }
        },
        readGroups: function () {
            axios
                .post("/readGroups")
                .then(response => {
                    this.groups = response.data;
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        type: "error",
                        group: "Info",
                        title: "Hey! ",
                        text: error
                    });
                });
        },
        readUsersForFilters: function () {
            axios
                .post("/readUsers")
                .then(response => {
                    this.users = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        newOne: function () {
            this.updateMode = false;
            this.group = {
                name: "",
                users: []
            };
        }
    },
    mounted: function () {
        this.readUsersForFilters();
        this.readGroups();
    }
};
</script>

<style scoped>
.groups-table {
    display: block;
    border: 1px solid green;
    height: 400px;
    overflow-y: scroll;
}

.option__image {
    width: 80px;
}
</style>
