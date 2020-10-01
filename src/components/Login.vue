<template>
<div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

        <div class="col-xl-10 col-lg-12 col-md-9">

            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <!-- Nested Row within Card Body -->
                    <div class="row">
                        <div class="col-lg-6 mx-auto d-none d-lg-block ">
                            <div class="text-center"><img src="../assets/img/aph_refait.jpg" style="width:200px;height:150px;margin-top:100px"></img></div>
                        </div>
                        <div class="col-lg-6">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Bienvenue !</h1>
                                </div>
                                <form id="myform" class="user">
                                    <div class="form-group">
                                        <input type="email" name="email" class="form-control form-control-user" v-model="user.email" id="email" aria-describedby="email" placeholder="Entrez votre adresse Email...">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="password" class="form-control form-control-user" v-model="user.password" id="password" placeholder="Mot de passe">
                                    </div>
                                    <!-- <div class="form-group"> -->
                                    <!-- <div class="custom-control custom-checkbox small"> -->
                                    <!-- <input type="checkbox" class="custom-control-input" id="customCheck"> -->
                                    <!-- <label class="custom-control-label" for="customCheck">Se souvenir de moi</label> -->
                                    <!-- </div> -->
                                    <!-- </div> -->
                                    <a v-on:click='getAuth()' class="btn btn-primary btn-user btn-block" style="color:white">
                                        Identification
                                    </a>
                                    <hr>
                                    <!-- <a href="index.html" class="btn btn-google btn-user btn-block"> -->
                                    <!-- <i class="fab fa-google fa-fw"></i> Login with Google -->
                                    <!-- </a> -->
                                    <!-- <a href="index.html" class="btn btn-facebook btn-user btn-block"> -->
                                    <!-- <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook -->
                                    <!-- </a> -->
                                </form>
                                <hr>
                                <!-- <div class="text-center"> -->
                                <!-- <a class="small" href="forgot-password.html">Mot de passe oublié ?</a> -->
                                <!-- </div> -->
                                <div class="text-center">
                                    <a class="small" v-on:click='register()'>Créer un compte !</a>
                                </div>
                            </div>
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
axios.defaults.withCredentials = true;

export default {
  
    name: 'Login',
    props: ["id"],
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
            auth: false
        };
    },
    methods: {
        logOut: function () {

            axios
                .post("/logout")
                .then(function (reponse) {
                      localStorage.deleteItem('user');
                    alert("logout ok");
                })
                .catch(function (erreur) {
                    //On traite ici les erreurs éventuellement survenues
                    console.log(erreur);
                });
        },
        register: function () {
              this.$router.push("/register");
        },
        
        getAuth: function () {
           
             axios
                .post("/getAuth", this.user)
                .then(response => {

                    // this.$user =  response.data; 
                    // localStorage.setItem('user', JSON.stringify(response.data));



                    this.$store.commit('setUser',response.data)
                    this.$notify({
                        group: 'foo',
                        title: 'Bienvenue dans l\'application ',
                        text: 'Identification OK !'
                    });
                   this.$router.push("/profile");
                   
                })
                .catch(error => {
                     this.$notify({
                            type: 'error',
                            group: 'foo',
                            title: 'Hey! ',
                            text: 'Login Error ! -> <br> '+error
                        });
                    console.log(error);
                    this.$router.push("/login");
                });



            this.auth = true;
        }
    },
    mounted: function () {
     this.$notify({
        group: 'foo',
        title: 'Bienvenue dans l\'application ',
        text: 'Veillez à vous identifier.!'
        });
             
    }
};
</script>

<style>





</style>
