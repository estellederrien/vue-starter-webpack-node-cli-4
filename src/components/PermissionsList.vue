<template>
<div class="card">
    <div class="card-body">
        <h5 class="card-title">
            <i class="fas fa-lock"></i> {{ t("PERMISSIONS") }}
        </h5>
        <div class="row">
            <div class="col-md-2">
                <label>{{ t("PROFILE") }}</label>
            </div>
            <div class="col-md-6">
                <select class="custom-select" v-model="user.role" :disabled="!creationProcess">
                    <option value="">--Please choose an option--</option>
                    <option value="viewer">Viewer</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="administrator">Administrator</option>
                </select>
            </div>
        </div>
        <br>
        <div class="row" v-if="!creationProcess">
            <div class="col-md-2">
                <label>{{ t("PERMISSIONS_LIST") }}</label>
            </div>
            <div class="col-md-6"> <span class="badge badge-warning  badge-space" v-for="p in user.permissions"> {{p}}
                    <br>
                </span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// Import others components
import axios from "axios";

export default {
    name: "permissionslist",
    props: ["user","creationProcess"], // USER OBJECT IS COMING FROM PROFILE.JS !
    beforeCreate: function () {

    },
    data() {
        return {
        };
    },
    methods: {

    },
    mounted: function () {

    }
};
</script>

<style scoped>
</style>
