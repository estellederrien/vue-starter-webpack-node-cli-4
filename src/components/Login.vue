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
                .post(this.server + "logout")
                .then(function (reponse) {
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
            console.log(this.user);
           var self = this;
            axios
                .post(this.server + "getAuth", this.user)
                .then(function (reponse) {
                    alert('ok')
                   self.$router.push("/user/profile");
                })
                .catch(function (erreur) {
                    alert("Problème d'identification");
                    //On traite ici les erreurs éventuellement survenues
                    console.log(erreur);
                });

            this.auth = true;
        }
    },
    created: function () {
       /*  if (this.$route.fullPath == "/logout") {
            this.logOut();
        } */
    }
};
</script>

<style>
/* ---------------------------------------------------
 PROFILE
----------------------------------------------------- */

.emp-profile {
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}

.profile-img {
    text-align: center;
}

.profile-img img {
    width: 70%;
    height: 100%;
}

.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}

.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}

.profile-head h5 {
    color: #333;
}

.profile-head h6 {
    color: #0062cc;
}

.profile-edit-btn {
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
}

.proile-rating {
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}

.proile-rating span {
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}

.profile-head .nav-tabs {
    margin-bottom: 5%;
}

.profile-head .nav-tabs .nav-link {
    font-weight: 600;
    border: none;
}

.profile-head .nav-tabs .nav-link.active {
    border: none;
    border-bottom: 2px solid #0062cc;
}

.profile-work {
    padding: 14%;
    margin-top: -15%;
}

.profile-work p {
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}

.profile-work a {
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}

.profile-work ul {
    list-style: none;
}

.profile-tab label {
    font-weight: 600;
}

.profile-tab p {
    font-weight: 600;
    color: #0062cc;
}

/* LIST USERS  */

.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

@media (max-width: 768px) {
    .btn {
        font-size: 11px;
        padding: 4px 6px;
    }
}

@media (min-width: 768px) {
    .btn {
        font-size: 12px;
        padding: 6px 12px;
    }
}

@media (min-width: 992px) {
    .btn {
        font-size: 14px;
        padding: 8px 12px;
    }
}

@media (min-width: 1200px) {
    .btn {
        padding: 10px 16px;
        font-size: 18px;
    }
}

/* TOPBAR */
.rounded-circle {
    border-radius: 50% !important;
}

.dropdown-list-image {
    position: relative;
    height: 2.5rem;
    width: 2.5rem;
}

.dropdown-list-image img {
    height: 2.5rem;
    width: 2.5rem;
}

.dropdown-list-image .status-indicator {
    background-color: #eaecf4;
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    border: 0.125rem solid #fff;
}

/* DAHSBOARD */
#wrapper {
    position: relative;
    padding-top: 20px;
    background: #000524;
    border: 1px solid #000;
    box-shadow: 0 22px 35px -16px rgba(0, 0, 0, 0.71);
    max-width: 850px;
    margin: 35px auto;
}

/* 
HOME  */
.container {
    max-width: 960px;
}

.pricing-header {
    max-width: 700px;
}

.card-deck .card {
    min-width: 220px;
}

.border-top {
    border-top: 1px solid #e5e5e5;
}

.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}

.box-shadow {
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}
</style>
