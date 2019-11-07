<template>
<div class="container ">
    <form method="post">
        <div class="row">
            <div class="col-md-4">
                <div class="profile-img"><upload @filename="onUpload" v-if="this.auth"></upload>
                    <img v-bind:src="this.server + user.img" @error="replaceByDefault" style="width:150px"/>
                    <!-- <div class="file btn btn-lg btn-primary"> -->

                    <!-- <input type="file" name="file" /> -->
                    <!-- </div> -->

                </div>
               
            </div>

            <div class="col-md-6">
                <div class="profile-head">
                    <h5>
                        {{user.prenom }} {{user.nom.toUpperCase()}}

                    </h5>
                    <h6>
                        Web Developer and Designeuses
                        <a v-on:click="show()" class="btn btn-danger"> Message</a>
                        <v-dialog />

                        <!--   <modal name="hello-world">
                            hello, world!
                        </modal> -->
                    </h6>

                    <p class="proile-rating">RANG : <span>8/10</span></p>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">A propos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Dernières infos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="files-tab" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false">Fichiers</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2">
                <span v-if="auth" v-on:click="updateUser()" class="btn btn-primary" name="btnAddMore">Mise à jour</span >
                <span  v-if="auth" v-on:click="deleteUser()" class="btn btn-danger" name="btnAddMore">Supprimer</span >
                  
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
               
                <div class="profile-work">
                    <p>LIENS DE TRAVAIL</p>
                    <a href="">Website</a><br />
                    <a href="">Bootsnipp</a><br />
                    <a href="">Bootply</a>
                    <p>SKILLS</p>
                    <a href="">Web Designer</a><br />
                    <a href="">Web Developer</a><br />
                    <a href="">WordPress</a><br />
                    <a href="">WooCommerce</a><br />
                    <a href="">PHP, .Net</a><br />
                </div>
            </div>
            <div class="col-md-8">
                <div class="tab-content profile-tab" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="row">
                            <div class="col-md-2">
                                <label>User Id </label>
                            </div>
                            <div class="col-md-6">
                                <p>{{user._id}}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <label>Nom</label>
                            </div>
                            <div class="col-md-6">
                                <p><input v-model="user.nom" class="form-control" placeholder="modifiez-moi"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <label>Prénom</label>
                            </div>
                            <div class="col-md-6">
                                <p><input v-model="user.prenom" class="form-control" placeholder="modifiez-moi"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <label>Email</label>
                            </div>
                            <div class="col-md-6">
                                <p><input v-model="user.email" class="form-control" placeholder="modifiez-moi"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <label>Téléphone</label>
                            </div>
                            <div class="col-md-6">
                                <p><input v-model="user.phone" class="form-control" placeholder="modifiez-moi"></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <label>Profession</label>
                            </div>
                            <div class="col-md-6">
                                <p><input v-model="user.job" class="form-control" placeholder="modifiez-moi"></p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="row">
                            <div class="col-md-2">
                                <label>Experience</label>
                            </div>
                            <div class="col-md-6">
                                <p>Expert</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <label>Hourly Rate</label>
                            </div>
                            <div class="col-md-6">
                                <p>10$/hr</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <label>Total Projects</label>
                            </div>
                            <div class="col-md-6">
                                <p>230</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <label>English Level</label>
                            </div>
                            <div class="col-md-6">
                                <p>Expert</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <label>Availability</label>
                            </div>
                            <div class="col-md-6">
                                <p>6 months</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Your Bio</label><br />
                                <p>Your detail description

                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="files" role="tabpanel" aria-labelledby="profile-tab">
                        <div class="row">
                            <div class="col-md-12">
                               <uploadfiles @filename="onUpload" v-if="this.auth"></uploadfiles>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true
import Upload from "@/components/Upload.vue";
import Uploadfiles from "@/components/Uploadfiles.vue";
import {
    SidebarMenu
} from 'vue-sidebar-menu';

export default {
    name: 'User',
    props: ["id"],
    data() {
        return {
            user: {
                nom: "test",
                prenom: "test",
                _id: "",
                phone: "",
                profession: "",
                email: "",
                password: "",
                img: ""
            },
            auth: false
        };
    },
    components: {
        'upload': Upload,
        'uploadfiles':Uploadfiles
    },
    methods: {
         replaceByDefault(e) {
            e.target.src = this.server + 'defaut.png';
        },
        onUpload(value) {
            // Pass Picture URL to the user object .
            this.user.img = value;
            console.log(this.user);

        },
        show() {
            // this.$modal.show('hello-world');
            this.$modal.show('dialog', {
                title: 'Alert!',
                text: 'You are too awesome',
                buttons: [{
                        title: 'Deal with it',
                        handler: () => {
                            alert('Woot!')
                        }
                    },
                    {
                        title: '', // Button title
                        default: true, // Will be triggered by default if 'Enter' pressed.
                        handler: () => {} // Button click handler
                    },
                    {
                        title: 'Close'
                    }
                ]
            })
        },
        hide() {
            this.$modal.hide('hello-world');
        },
        getUser: function () {
            axios
                .post(this.server + "getUser", {
                    id: this.id
                })
                .then(response => {
                    this.user = response.data;
                    console.log(response.data);
                })
                .catch(function (erreur) {
                    console.log(erreur);
                });
        },
        updateUser: function () {
            axios
                .post(this.server + "updateUser", this.user)
                .then(response => {
                    alert(" MAJ ok ! ");
                    console.log(response);
                })
                .catch(function (erreur) {
                    console.log(erreur);
                });
        },
        deleteUser: function () {
            if (confirm("Do you really want to delete?")) {
                axios
                    .post(this.server + "deleteUser", this.user)
                    .then(response => {
                        alert(" Votre compte a été supprimé ");
                        router.push("/login");
                        console.log(response);
                    })
                    .catch(function (erreur) {
                        console.log(erreur);
                    });
            }
        },
        getActualSession: function () {
            var self = this;

            axios(this.server + "getActualSession", {
                    method: "post",
                    withCredentials: true
                }).then(function (response) {
                    // alert('ok loggé');
                    self.user = response.data;
                    self.auth = true;
                    self.user.img = response.data.img;
                })
                .catch(function (erreur) {

                    alert("Problème d'identification");
                     self.$router.push("/login");
                    //On traite ici les erreurs éventuellement survenues
                    console.log(erreur);
                });

        }
    },
    mounted: function () {
        // This is the id value comin from the router

        //   LOADING YOUR OWN PROFILE COMING FROM THE PROFILE MENU
        if (this.id == "profile") {
            this.getActualSession();
           
        }
        //   LOADING ANY PROFILE BY _ID, COMING FROM THE USERS VIEW
        else {

            this.getUser(this.id);
        }

    }
}
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
