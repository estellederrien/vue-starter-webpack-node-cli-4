<template>
<div class="row tab-content-user">
    <div class="col-md-6">
        <div class="row" v-if="!creationProcess">
            <div class="col-md-2">
                <label>User Id</label>
            </div>
            <div class="col-md-8">
                <p>
                    <input v-model="user._id" class="form-control" placeholder="modifiez-moi" disabled />
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>Nom</label>
            </div>
            <div class="col-md-8" :class="{ 'form-group--error': $v.user.nom.$error }">
                <p>
                    <input v-model="user.nom" class="form-control" v-on:input="$v.user.nom.$touch" placeholder="modifiez-moi" v-bind:class="{'is-invalid': $v.user.nom.$error, 'is-valid': $v.user.nom.$dirty && !$v.user.nom.$invalid}" />
                    <!-- ERRORS MESSAGES t-->
                    <div class="error" v-if="!$v.user.nom.required">Le champs est nécessessaire</div>
                    <div class="error" v-if="!$v.user.nom.minLength">Le nom doit avoir au moins {{ $v.user.nom.$params.minLength.min }} letters.</div>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>Prénom</label>
            </div>
            <div class="col-md-8" :class="{ 'form-group--error': $v.user.prenom.$error }">
                <p>
                    <input v-model="user.prenom" class="form-control" placeholder="modifiez-moi" v-on:input="$v.user.prenom.$touch" v-bind:class="{'is-invalid': $v.user.prenom.$error, 'is-valid': $v.user.prenom.$dirty && !$v.user.prenom.$invalid}" />
                    <!-- ERRORS MESSAGES -->
                    <div class="error" v-if="!$v.user.prenom.required">Le champs est nécessessaire</div>
                    <div class="error" v-if="!$v.user.prenom.minLength">Le prénom doit avoir au moins {{ $v.user.nom.$params.minLength.min }} letters.</div>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>Email</label>
            </div>
            <div class="col-md-8" :class="{ 'form-group--error': $v.user.email.$error }">
                <p>
                    <input v-model="user.email" type="email" class="form-control" placeholder="modifiez-moi" v-on:input="$v.user.email.$touch" v-bind:class="{'is-invalid': $v.user.email.$error, 'is-valid': $v.user.email.$dirty && !$v.user.email.$invalid}" />
                    <!-- ERRORS MESSAGES -->
                    <div class="error" v-if="!$v.user.email.required">Le champs est nécessessaire</div>
                    <div class="error" v-if="!$v.user.email.minLength">L'Email doit avoir au moins {{ $v.user.email.$params.minLength.min }} lettres.</div>
                </p>
            </div>
        </div>
        <div class="row" v-if="creationProcess">
            <div class="col-md-2">
                <label>Password</label>
            </div>
            <div class="col-md-4">
                <p>
                    <input v-model="user.password" class="form-control" placeholder="modifiez-moi" />
                    <!-- ERRORS MESSAGES -->
                    <div class="error" v-if="!$v.user.password.required">Le champs est nécessessaire</div>
                    <div class="error" v-if="!$v.user.password.minLength">L'Email doit avoir au moins {{ $v.user.password.$params.minLength.min }} lettres.</div>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <label>Téléphone</label>
            </div>
            <div class="col-md-8" :class="{ 'form-group--error': $v.user.phone.$error }">
                <p>
                    <input v-model="user.phone" class="form-control" placeholder="modifiez-moi" v-on:input="$v.user.phone.$touch" v-bind:class="{'is-invalid': $v.user.phone.$error, 'is-valid': $v.user.phone.$dirty && !$v.user.phone.$invalid}" />
                    <!-- ERRORS MESSAGES -->
                    <div class="error" v-if="!$v.user.phone.minLength">Le téléphone doit avoir au moins {{ $v.user.phone.$params.minLength.min }} chiffres.</div>
                </p>
            </div>
        </div>
        <!--   FIND DE COLONNE 2-->
    </div>
    <div class="col-md-6">
        <div class="row">
            <div class="col-md-2">
                <label>Date de naissance</label>
            </div>
            <div class="col-md-10">
                <p>
                    <input v-model="user.birthday" @change="getAge" class="form-control" type="date">
                    <!-- <input v-model="user.birthday" @change="getAge" class="form-control" type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" > -->
                </p>
            </div>
            <div class="col-md-2">
                <label>Age</label>
            </div>
            <div class="col-md-10">
                <p>
                    <input v-model="user.age" class="form-control" disabled></input>
                </p>
            </div>
            <div class="col-md-2">
                <label>Job</label>
            </div>
            <div class="col-md-4">
                <select class="form-control " v-model="user.job">
                    <option v-for="job in jobs" :value="job.name">{{job.name}}</option>
                </select>
            </div>
            <div class="col-md-6">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="createJob()">+</button>
                    </div>
                    <input v-model="newJob" type="text" class="form-control" placeholder="" placeholder="Ajouter un job" aria-label="Example text with button addon" aria-describedby="button-addon1">
                </div>
            </div>
            <div class="col-md-2">
                <label>Description</label>
            </div>
            <div class="col-md-10">
                <p>
                    <textarea class="form-control" rows="3"></textarea>
                </p>
            </div>
        </div>
        <!--   FIND DE COLONNE 1-->
    </div>
    <!-- </FIN DE ROW 1> -->
</div>
</template>

<script>
// Import others components
import axios from "axios";

export default {
    name: "UserForm",
    props: ["user"], // SEE DOC !
    beforeCreate: function () {

    },
    data() {
        return {
            var1: "Test"
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
