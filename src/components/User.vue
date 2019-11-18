<template>
<div class="container-fluid ">
    <form method="post">
        <div class="row">
            <div class="col-md-2">
                <div class="profile-img">
                    <img v-bind:src="server + 'img/' + user.img" @error="replaceByDefault" style="width:150px" />
                </div>
            </div>

            <div class="col-md-8">
                <div class="profile-head">
                    <h5>{{ user.prenom }} {{ user.nom.toUpperCase() }}</h5>
                    <h6>
                        Web Developer and Designeuses

                        <!--   <modal name="hello-world">
                            hello, world!
                        </modal> -->
                    </h6>

                    <p class="proile-rating">RANG : <span>8/10</span></p>

                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i class="fas fa-home"></i> A propos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><i class="fas fa-info"></i> Dernières infos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="files-tab" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false"><i class="fas fa-file-alt"></i> Fichiers</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="files-tab" data-toggle="tab" href="#authorizations" role="tab" aria-controls="files" aria-selected="false"><i class="fas fa-users-cog"></i> Autorisations</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-2">
                test
            </div>
        </div>

        <div class="row">
            <div class="col-md-2 d-none d-sm-block">
                <div class="profile-work" style="background-color : lightgrey">
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
                <div class="tab-content profile-tab" id="myTabContent" style="background-color : lightgrey">
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
                                    <input v-model="user.prenom" 
                                    class="form-control" 
                                    placeholder="modifiez-moi" 
                                    v-on:input="$v.user.prenom.$touch" v-bind:class="{'is-invalid': $v.user.prenom.$error, 'is-valid': $v.user.prenom.$dirty && !$v.user.prenom.$invalid}" />

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

                                    <input v-model="user.email" class="form-control" 
                                    placeholder="modifiez-moi"
                                     v-on:input="$v.user.email.$touch" 
                                     v-bind:class="{'is-invalid': $v.user.email.$error, 'is-valid': $v.user.email.$dirty && !$v.user.email.$invalid}" />
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
                                    <input v-model="user.phone" class="form-control" 
                                    placeholder="modifiez-moi" 
                                     v-on:input="$v.user.phone.$touch" 
                                   v-bind:class="{'is-invalid': $v.user.phone.$error, 'is-valid': $v.user.phone.$dirty && !$v.user.phone.$invalid}"  />
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
                                <label>Profession</label>
                            </div>
                            <div class="col-md-6">
                                <p>
                                    <input v-model="user.job" class="form-control" placeholder="modifiez-moi" />
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
                        <div class="row" >
                           <!--  <div class="col-md-6">
                                <uploadfiles @myfilenamesevent="onFileUploads"></uploadfiles>
                            </div> -->

                            <div class="col-md-6 tab-content-user" >
                                <label>Liste</label><br />
                                <tr v-for="file in user.filenames">
                                    <td>
                                        <i class="fas fa-file-alt"></i>
                                        <a v-bind:href="server + 'files/' + file.filename">{{
                        file.filename
                      }}</a>
                                    </td>
                                    <td>
                                        <span class="remove-file btn btn-primary" v-on:click="deleteFile(file)"><i class="far fa-trash-alt"></i><br /></span>
                                    </td>
                                </tr>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="authorizations" role="tabpanel" aria-labelledby="authorizations-tab">
                      
                        <div class="row">
                            <div class="col-md-6 tab-content-user" >  <label>Liste des droits</label>
                                <div v-for="p in user.permissions" >
                                      <span class="badge badge-warning  ">  {{p}}<br></span>
                                </div>      
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <span v-if="auth" v-on:click="updateUser()" class="btn btn-primary btn-block">Mise à jour</span><br />
                <span v-if="auth" v-on:click="deleteUser()" class="btn btn-danger btn-block">Supprimer</span><br />
                <span><a class="btn btn-primary btn-block" v-on:click="show()">
                        Message</a>
                    <v-dialog /></span><br />

                <upload @filename="onUpload" v-if="this.auth" style="margin-top:10px">
                </upload>
            </div>
        </div>
    </form>
</div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import Upload from "@/components/Upload.vue";
import Uploadfiles from "@/components/Uploadfiles.vue";
import {
    SidebarMenu
} from "vue-sidebar-menu";
import {
    required,
    minLength,
    between
} from "vuelidate/lib/validators";

export default {
    name: "User",
    props: ["id"],
    beforeCreate: function() {
        console.log(this.$userid)
    },
    data() {
        return {
            user: {
                nom: "",
                prenom: "",
                _id: "",
                phone: "",
                profession: "",
                email: "",
                password: "",
                img: "",
                filenames: []
            },
            auth: false
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
        upload: Upload,
        uploadfiles: Uploadfiles
    },
    methods: {
        deleteFile(file) {
            let self = this;
            if (confirm("Do you really want to delete?")) {
                axios
                    .post(this.server + "deleteFile", {
                        name: file.filename
                    })
                    .then(response => {
                        alert(" File has been deleted from server");

                        self.user.filenames = self.user.filenames.filter(function (obj) {
                            return obj.filename !== file.filename;
                        });

                        this.updateUser();
                    })
                    .catch(function (erreur) {
                        console.log(erreur);
                    });
            }
        },
        replaceByDefault(e) {
            e.target.src = this.server + "/img/defaut.png";
        },
        show() {
            // this.$modal.show('hello-world');
            this.$modal.show("dialog", {
                title: "Alert!",
                text: "You are too awesome",
                buttons: [{
                        title: "Deal with it",
                        handler: () => {
                            alert("Woot!");
                        }
                    },
                    {
                        title: "", // Button title
                        default: true, // Will be triggered by default if 'Enter' pressed.
                        handler: () => {} // Button click handler
                    },
                    {
                        title: "Close"
                    }
                ]
            });
        },
        hide() {
            this.$modal.hide("hello-world");
        },
        getUser: function () {
            axios
                .post(this.server + "getUser", {
                    id: this.id
                })
                .then(response => {
                    this.user = response.data;
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
        }
    },
    mounted: function () {
   
        this.getUser(this.id);
        
    }
};
</script>

<style>

.tab-content-user{

    height:50vh;
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
