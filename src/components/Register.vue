<template>
<div class="container">

    <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
                <div class="col-lg-5 mx-auto d-none d-lg-block ">
                    <div class="text-center"><img src="../assets/img/aph_refait.jpg" style="width:200px;height:150px;margin-top:150px"></img></div>
                </div>
                <div class="col-lg-7">
                    <div class="p-5">
                        <div class="text-center">
                            <h1 class="h4 text-gray-900 mb-4">Créer un compte !</h1>
                        </div>
                        <form class="user " id="form">
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="text" class="form-control form-control-user" min="1" v-model="user.prenom" name="prenom" value="prenom" id="prenom" placeholder="Prénom">
                                    <!-- ERRORS MESSAGES -->
                                     <div v-if="cliqued ">
                                        <div class="error" v-if="!$v.user.prenom.required">
                                            Le champs est nécessaire
                                        </div>
                                        <div class="error" v-if="!$v.user.prenom.minLength">
                                            Le prénom doit avoir au moins
                                            {{ $v.user.nom.$params.minLength.min }} letters.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control form-control-user" min="1" v-model="user.nom" name="nom" value="nom" id="nom" placeholder="Nom">
                                    <!-- ERRORS MESSAGES -->
                                    <div v-if="cliqued ">
                                        <div class="error" v-if="!$v.user.nom.required">
                                            Le champs est nécessaire
                                        </div>
                                        <div class="error" v-if="!$v.user.nom.minLength">
                                            Le nom doit avoir au moins
                                            {{ $v.user.nom.$params.minLength.min }} letters.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control form-control-user" min="1" v-model="user.email" name="email" value="email" id="email" placeholder="Email">
                                <!-- ERRORS MESSAGES -->
                                 <div v-if="cliqued ">
                                    <div class="error" v-if="!$v.user.email.required">
                                        Le champs est nécessaire
                                    </div>
                                    <div class="error" v-if="!$v.user.email.minLength">
                                        L'Email doit avoir au moins
                                        {{ $v.user.email.$params.minLength.min }} lettres.
                                    </div>
                                    <div class="error" v-if="!$v.user.email.email">
                                        L'Email doit être valide
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="password" class="form-control form-control-user" min="1" v-model="user.password" value="password" id="password" placeholder="Mot de passe">
                                    <!-- ERRORS MESSAGES -->
                                     <div v-if="cliqued ">
                                        <div class="error" v-if="!$v.user.password.required">
                                            Le champs est nécessaire
                                        </div>
                                        <div class="error" v-if="!$v.user.password.minLength">
                                            Le mot de passe doit avoir au moins
                                            {{ $v.user.password.$params.minLength.min }} lettres.
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="col-sm-6">

<input type="password" class="form-control form-control-user" name="password"value ="password" id="password" placeholder="Mot de passe">

  </div> -->
                            </div>
                            <a v-on:click='register()' class="btn btn-primary btn-user btn-block" style="color:white">Enregistrement</a>
                            <span class="badge badge-danger btn-block" v-if="problem">vous avez oublié de renseigner un champ !</span>
                            <hr>
                            <!-- <a href="index.html" class="btn btn-google btn-user btn-block"> -->
                            <!-- <i class="fab fa-google fa-fw"></i> Register with Google -->
                            <!-- </a> -->
                            <!-- <a href="index.html" class="btn btn-facebook btn-user btn-block"> -->
                            <!-- <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook -->
                            <!-- </a> -->
                        </form>
                        <hr>
                        <!-- <div class="text-center" disabled>
                <a class="small" v-on:click='login()'>Mot de passe oublié?</a>
              </div> -->
                        <div class="text-center">
                            <a class="small" v-on:click='routeLogin()'>Déjà un compte ? S'identifier</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {
    required,
    minLength,
    between, 
    email 
} from "vuelidate/lib/validators";
export default {
    name: 'Register',
    data() {
        return {
            user: {
                nom: "",
                prenom: "",
                email: "",
                password: ""
            },
            problem: false,
            cliqued:false
        }
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
                required,
                minLength: minLength(2)
            }
        }
    },

    methods: {
        routeLogin: function () {
            this.$router.push("/login");
        },
        register: function () {
             this.cliqued = true;  
            console.log(this.user);

            if (
                !this.user.password ||
                !this.user.prenom ||
                !this.user.nom ||
                !this.user.email||
                !this.$v.user.email.email
            ) {

               
                this.problem = true;
                this.$notify({
                    type: 'error',
                    group: 'foo',
                    title: 'Hey! ',
                    text: 'Something is wrong, please check the fields again !'
                });
                return;
            }

            //  this.$v.form.$touch();
              // if its still pending or an error is returned do not submit
            //if (!$v.user.email.email) return;

            axios
                .post("/registerUser", this.user)
                .then(response => {
                    if (response.data.problem) {
                        alert(response.data.problem);
                        console.log(response.data.problem);
                    } else {
                        this.$notify({
                            type: 'success',
                            group: 'foo',
                            title: 'Hey! ',
                            text: 'Added one user !'
                        });
                    }

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
    },
    
    created: function () {
        this.cliqued = false;
        this.$notify({
            type: 'success',
            group: 'foo',
            title: 'Bonjour ! ',
            text: 'Vous pouvez vous enregistrer !'
        });
    }
}
</script>

<style>

</style>
