<template>
<div>
    <div>
        <span v-if="!loaded"><img src="../assets/img/loader_800.gif" class="loader"></src></span>
    </div>
    <div class="container-fluid " id="userDiv" v-show="loaded">
        <form method="post">
            <div class="row">
                
                <div class="col-md-2">
                    <div class="profile-img">
                        <img v-bind:src="user.img" @error="replaceByDefault" style="width:150px" />
                    </div>
                </div>

                <div class="col-md-8">
                    <div class="profile-head">
                        <h5>{{ user.prenom }} {{ user.nom.toUpperCase() }}</h5>
                        <h6>
                            {{user.mentra}}
                        </h6>

                        <!-- <p class="proile-rating"></p> -->

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i class="fas fa-home"></i><span class="d-none d-sm-block "> A propos</span></a>
                            </li>
                          <!--   <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><i class="fas fa-info"></i> <span class="d-none d-sm-block ">Dernières infos</span></a>
                            </li> -->
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#files" role="tab" ><i class="fas fa-file-alt"></i> <span class="d-none d-sm-block ">Fichiers</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#authorizations" role="tab"  ><i class="fas fa-lock"></i> <span class="d-none d-sm-block ">Permissions</span></a>
                            </li>
                            

                        </ul>
                    </div>
                </div>
                
                <div class="col-md-2">

                </div>
            </div>

            <div class="row">
                <div class="col-md-2 d-none d-md-block">
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
                                    <p>
                                        <input v-model="user._id" class="form-control" placeholder="modifiez-moi" disabled />
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <label>Nom</label>
                                </div>
                                <div class="col-md-6" :class="{ 'form-group--error': $v.user.nom.$error }">

                                    <p>
                                        <input v-model="user.nom" class="form-control" v-on:input="$v.user.nom.$touch" placeholder="modifiez-moi" v-bind:class="{'is-invalid': $v.user.nom.$error, 'is-valid': $v.user.nom.$dirty && !$v.user.nom.$invalid}" />
                                        <!-- ERRORS MESSAGES -->
                                        <div class="error" v-if="!$v.user.nom.required">
                                            Le champs est nécessessaire
                                        </div>
                                        <div class="error" v-if="!$v.user.nom.minLength">
                                            Le nom doit avoir au moins
                                            {{ $v.user.nom.$params.minLength.min }} letters.
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <label>Prénom</label>
                                </div>
                                <div class="col-md-6" :class="{ 'form-group--error': $v.user.prenom.$error }">
                                    <p>
                                        <input v-model="user.prenom" class="form-control" placeholder="modifiez-moi" v-on:input="$v.user.prenom.$touch" v-bind:class="{'is-invalid': $v.user.prenom.$error, 'is-valid': $v.user.prenom.$dirty && !$v.user.prenom.$invalid}" />

                                        <!-- ERRORS MESSAGES -->
                                        <div class="error" v-if="!$v.user.prenom.required">
                                            Le champs est nécessessaire
                                        </div>
                                        <div class="error" v-if="!$v.user.prenom.minLength">
                                            Le prénom doit avoir au moins
                                            {{ $v.user.nom.$params.minLength.min }} letters.
                                        </div>

                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <label>Email</label>
                                </div>
                                <div class="col-md-6" :class="{ 'form-group--error': $v.user.email.$error }">
                                    <p>

                                        <input v-model="user.email" class="form-control" placeholder="modifiez-moi" v-on:input="$v.user.email.$touch" v-bind:class="{'is-invalid': $v.user.email.$error, 'is-valid': $v.user.email.$dirty && !$v.user.email.$invalid}" />
                                        <!-- ERRORS MESSAGES -->
                                        <div class="error" v-if="!$v.user.email.required">
                                            Le champs est nécessessaire
                                        </div>
                                        <div class="error" v-if="!$v.user.email.minLength">
                                            L'Email doit avoir au moins
                                            {{ $v.user.nom.$params.minLength.min }} lettres.
                                        </div>

                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <label>Téléphone</label>
                                </div>
                                <div class="col-md-6" :class="{ 'form-group--error': $v.user.phone.$error }">
                                    <p>
                                        <input v-model="user.phone" class="form-control" placeholder="modifiez-moi" v-on:input="$v.user.phone.$touch" v-bind:class="{'is-invalid': $v.user.phone.$error, 'is-valid': $v.user.phone.$dirty && !$v.user.phone.$invalid}" />
                                        <!-- ERRORS MESSAGES -->

                                        <div class="error" v-if="!$v.user.phone.minLength">
                                            Le téléphone doit avoir au moins
                                            {{ $v.user.phone.$params.minLength.min }} chiffres.
                                        </div>
                                        <!--   <div class="error" v-if="!$v.user.phone.numeric">
                                        Le téléphone ne doit pas comporter de lettres
                                       
                                    </div> -->
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <label>Job</label>
                                </div>
                                <div class="col-md-6">
                                    <p>

                                        {{user.job}}
                                        <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="row ">
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
                        </div>
                        <div class="tab-pane fade" id="files" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="row">
                                <div class="col-md-12 tab-content-user">

                                    <table class="table">
                                        <tr v-for="file in user.filenames">
                                            <td>
                                                    
                                               Fichier 
                                            </td>
                                            
                                            <td>

                                                <a class="float-left" v-bind:href="'files/' + file.filename"><i class="fas fa-file-alt"></i> {{ file.filename }}</a>
                                            </td>

                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="authorizations" role="tabpanel" aria-labelledby="authorizations-tab">

                            <div class="row">

                                    <div class="col-md-2">
                                        <label>Profil</label>
                                    </div>
                                    <div class="col-md-6">
                                    <select class="custom-select" v-model="user.role" disabled>
                                        <option value="">--Please choose an option--</option>
                                        <option value="viewer">Viewer</option>
                                        <option value="user">User</option>
                                        <option value="manager">Manager</option>

                                    </select>
                                   </div>
                            </div><br>
                             <div class="row">   

                                     <div class="col-md-2">
                                        <label>Liste des droits</label>
                                    </div>

                                     <div class="col-md-6">
                                        <span class="badge badge-warning  badge-space" v-for="p in user.permissions" > {{p}}<br> </span>
                                    </div>
                               
                            </div>
                        </div>
                        <div class="tab-pane fade" id="messageslist" role="tabpanel" >
                                test
                        </div>
                    </div>
                </div>
                <div class="col-md-2">

                    <span><a class="btn btn-primary btn-block" v-on:click="openMessageModal()">
                            <i class="far fa-envelope"></i> <span class="d-none d-sm-block">Message</span></a>
                        <v-dialog /></span>

                    </upload>
                </div>
            </div>
        </form>
    </div>

     <modal name="messageModal" :width="350" :height="400"><message :user="this.anonymous" ></message></modal>
</div>


    
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

import {
    SidebarMenu
} from "vue-sidebar-menu";
import {
    required,
    minLength,
    between
} from "vuelidate/lib/validators";

/* IMPORTING PERSONNAL COMPONENTS */
import Uploadpicture from "@/components/Uploadpicture.vue";
import Uploadfiles from "@/components/Uploadfiles.vue";
import Message from "@/components/Message.vue";


export default {
    name: "User",
    props: ["id"],
    beforeCreate: function () {
        console.log(this.$userid)
    },
    data() {
        return {
            user: {
                 _id: "",
                nom: "",
                prenom: "",    
                phone: "",
                email: "",
                password: "",
                img: "",
                filenames: []
            },
            anonymous:{
                _id: "anonymous",
                nom: "anonymous",
                prenom: "anonymous",    
                phone: "",
                email: "",
                password: "",
                img: "",
                filenames: []
            },
            auth: false,
            loaded: false
        };
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
                minLength: minLength(2)
            },
            phone: {
                minLength: minLength(2),
                numeric: true
            }
        }

    },
    components: {
        uploadpicture: Uploadpicture,
        uploadfiles: Uploadfiles,
        message:Message
    },
    methods: {
        
        
        openMessageModal: function() {
            this.$modal.show("messageModal");
        },
        replaceByDefault(e) {
            e.target.src = "defaut.jpg";
        },
        
        hide() {
            this.$modal.hide("hello-world");
        },
        readUser: function () {
            axios
                .post("readUser", {
                    id: this.id
                })
                .then(response => {
                    this.user = response.data;
                    this.loaded = true;
                    this.disableAllinputs();

                })
                .catch(function (erreur) {
                    console.log(erreur);
                });
        },
        disableAllinputs: function () {

            let elems = document.getElementById('userDiv').getElementsByTagName('input');
            for (let i = 0; i < elems.length; i++) {
                elems[i].disabled = true;
            }
            /*  let selects = document.getElementById('userDiv').getElementsByTagName('select');
             for (let i = 0; i < selects.length; i++) {
                 selects[i].disabled = true;
             } */
        }
    },
    mounted: function () {

        this.readUser(this.id);

    }

};
</script>

<style scope>

.badge-space{
    min-width:150px
}

.tab-content-user {
    padding: 10px;
    margin: 10px;
    margin-bottom:50px;

}

.error {
    border-color: red;
    background: #FDD;
}

.error:focus {
    outline-color: #F99;
}

.valid {
    border-color: #5A5;
    background: #EFE;
}

.valid:focus {
    outline-color: #8E8;
}

/* change all .btn to .btn-sm size on xs */
@include media-breakpoint-between(xs, sm) {
    .btn {
        @include button-size($input-btn-padding-y-sm,
            $input-btn-padding-x-sm,
            $font-size-sm,
            $line-height-sm,
            $btn-border-radius-sm);
    }
}

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
