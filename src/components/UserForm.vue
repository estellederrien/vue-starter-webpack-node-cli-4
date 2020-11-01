<template>
<div>
    <!-- TABS 1 -->
    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div class="row tab-content-user">
            <div class="col-md-6">
                <div class="row" v-if="!creationProcess">
                    <div class="col-md-2">
                        <label>User Id</label>
                    </div>
                    <div class="col-md-8">
                        <p>
                            <input v-model="user._id" class="form-control" :placeholder=" t('PARAMETER_ME') " disabled />
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <label>{{ t("LAST_NAME") }}</label>
                    </div>
                    <div class="col-md-8" :class="{ 'form-group--error': $v.user.nom.$error }">
                        <p>
                            <input v-model="user.nom" class="form-control" v-on:input="$v.user.nom.$touch" :placeholder=" t('PARAMETER_ME') " v-bind:class="{'is-invalid': $v.user.nom.$error, 'is-valid': $v.user.nom.$dirty && !$v.user.nom.$invalid}" />
                            <!-- ERRORS MESSAGES t-->
                            <div class="error" v-if="!$v.user.nom.required">{{t('FIELD_IS_MANDATORY')}}</div>
                            <div class="error" v-if="!$v.user.nom.minLength">Le nom doit avoir au moins {{ $v.user.nom.$params.minLength.min }} letters.</div>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <label>{{ t("FIRST_NAME") }}</label>
                    </div>
                    <div class="col-md-8" :class="{ 'form-group--error': $v.user.prenom.$error }">
                        <p>
                            <input v-model="user.prenom" class="form-control" :placeholder=" t('PARAMETER_ME') " v-on:input="$v.user.prenom.$touch" v-bind:class="{'is-invalid': $v.user.prenom.$error, 'is-valid': $v.user.prenom.$dirty && !$v.user.prenom.$invalid}" />
                            <!-- ERRORS MESSAGES -->
                            <div class="error" v-if="!$v.user.prenom.required">{{t('FIELD_IS_MANDATORY')}}</div>
                            <div class="error" v-if="!$v.user.prenom.minLength">Le prénom doit avoir au moins {{ $v.user.nom.$params.minLength.min }} letters.</div>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <label>{{ t("EMAIL") }}</label>
                    </div>
                    <div class="col-md-8" :class="{ 'form-group--error': $v.user.email.$error }">
                        <p>
                            <input v-model="user.email" type="email" class="form-control" :placeholder=" t('PARAMETER_ME') " v-on:input="$v.user.email.$touch" v-bind:class="{'is-invalid': $v.user.email.$error, 'is-valid': $v.user.email.$dirty && !$v.user.email.$invalid}" />
                            <!-- ERRORS MESSAGES -->
                            <div class="error" v-if="!$v.user.email.required">{{t('FIELD_IS_MANDATORY')}}</div>
                            <div class="error" v-if="!$v.user.email.minLength">L'Email doit avoir au moins {{ $v.user.email.$params.minLength.min }} lettres.</div>
                        </p>
                    </div>
                </div>
                <div class="row" v-if="creationProcess">
                    <div class="col-md-2">
                        <label>{{ t("PASSWORD") }}</label>
                    </div>
                    <div class="col-md-8">
                        <p>
                            <input v-model="user.password" class="form-control" :placeholder=" t('PARAMETER_ME') " />
                            <!-- ERRORS MESSAGES -->
                            <div class="error" v-if="!$v.user.password.required">{{t('FIELD_IS_MANDATORY')}}</div>
                            <div class="error" v-if="!$v.user.password.minLength">L'Email doit avoir au moins {{ $v.user.password.$params.minLength.min }} lettres.</div>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <label>{{ t("PHONE") }}</label>
                    </div>
                    <div class="col-md-8" :class="{ 'form-group--error': $v.user.phone.$error }">
                        <p>
                            <input v-model="user.phone" class="form-control" :placeholder=" t('PARAMETER_ME') " v-on:input="$v.user.phone.$touch" v-bind:class="{'is-invalid': $v.user.phone.$error, 'is-valid': $v.user.phone.$dirty && !$v.user.phone.$invalid}" />
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
                        <label>{{ t("BIRTHDAY") }}</label>
                    </div>
                    <div class="col-md-10">
                        <p>
                            <input v-model="user.birthday" @change="getAge" class="form-control" type="date">
                            <!-- <input v-model="user.birthday" @change="getAge" class="form-control" type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" > -->
                        </p>
                    </div>
                    <div class="col-md-2">
                        <label>{{ t("AGE") }}</label>
                    </div>
                    <div class="col-md-10">
                        <p>
                            <input v-model="user.age" class="form-control" disabled></input>
                        </p>
                    </div>
                    <div class="col-md-2">
                        <label>{{ t("JOB") }}</label>
                    </div>

                    <!-- JOB CRUD COMPONENT TODO -->
                    <div class="col-md-4">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-secondary btn-warning" type="button" id="button-addon1" @click="deleteJob()">-</button>
                            </div>
                            <select class="form-control " v-model="user.job">
                                <option v-for="job in jobs" :value="job.name">{{job.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-secondary btn-success" type="button" id="button-addon1" @click="createJob()">+</button>
                            </div>
                            <input v-model="newJob" type="text" class="form-control" :placeholder=" t('ADD_A_JOB') " aria-label="Example text with button addon" aria-describedby="button-addon1">
                        </div>
                    </div>
                    <!-- END JOB CRUD COMPONENT -->
                    <div class="col-md-2">
                        <label>{{ t("DESCRIPTION") }}</label>
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
    </div>
</div>
</template>

<script>
// Import others components
import axios from "axios";
import {
    required,
    minLength,
    between,
    email
} from "vuelidate/lib/validators";
export default {
    name: "userform",
    props: ["user", "creationProcess"], // USER OBJECT IS COMING FROM PROFILE.JS !
    beforeCreate: function () {

    },

    validations: {
        user: {
            nom: {
                required,
                minLength: minLength(2)
            },
            prenom: {
                required,
                minLength: minLength(2)
            },
            email: {
                required,
                minLength: minLength(2),
                email
            },
            password: {
                minLength: minLength(2),
                required
            },
            phone: {
                minLength: minLength(2),
                numeric: true
            }
        }
    },
    data() {
        return {
            jobs: [],
            newJob: "",
            selectedId: ''
        };
    },
    methods: {

        getAge: function () {
            var birthdate = new Date(this.user.birthday);
            var cur = new Date();
            var diff = cur - birthdate; // This is the difference in milliseconds
            var age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
            this.user.age = age;
        },
        selectId(e) {
            console.log(e)
            this.selectedId = e._id
        },
        createJob: function () {
            if (this.newJob.length < 3) {
                alert('trop court)')
                return;
            }
            axios
                .post("/generic-api/jobs", {
                    name: this.newJob,
                    creation_date: new Date()
                })
                .then(response => {
                    alert("Added one job !");
                    this.readJobs();
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        type: 'error',
                        group: 'foo',
                        title: 'Hey! ',
                        text: error
                    });
                });
        },
        readJobs: function () {
            axios
                .get("/generic-api/jobs")
                .then(response => {
                    this.jobs = response.data;
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        type: 'error',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'Permission is missing ! -> <br> ' + error
                    });
                });
        },
        updateJob: function () {},
        deleteJob: function () {
            // Getting _id from string
            var job_id = "";
            this.jobs.forEach((job, index) => {
                if (job.name == this.user.job) {
                    job_id = job._id;
                }
            })
            // building URL 
            const url = '/generic-api/jobs/' + job_id;
            // Delete using generic_crud.js
            if (confirm("Do you really want to delete : " + this.user.job + " ?")) {
                axios
                    .delete(url)
                    .then(response => {
                        this.$notify({
                            type: 'success',
                            group: 'foo',
                            title: 'Hey! ',
                            text: "Job had been deleted"
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            type: 'error',
                            group: 'foo',
                            title: 'Hey! ',
                            text: error
                        });
                    });
            }
        }
    },
    mounted: function () {
        this.readJobs();
    }
};
</script>

<style scoped>
</style>
