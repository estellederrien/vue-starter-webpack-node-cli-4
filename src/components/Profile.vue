<template>
<div>
    <div> <span v-if="!loaded">
            <img src="../assets/img/loader_800.gif" class="loader">
            </src>
        </span>
    </div>
    <div class="container-fluid " v-show="loaded">
        <form method="post" v-on:submit.prevent>
            <div class="row">
                <div class="col-md-2">
                    <div class="profile-img">
                        <img v-bind:src="user.img" @error="replaceByDefault" style="width:150px" />
                        <uploadpicture @filename="onUploadPicture" v-if="this.auth" style="margin-top:10px"></uploadpicture>
                    </div>
                    <div class="profile-work col-md-2 d-none d-md-block">
                        <p>LIENS DE TRAVAIL</p> <a href="">Website</a>
                        <br /> <a href="">Bootsnipp</a>
                        <br /> <a href="">Bootply</a>
                        <br>
                        <br>
                        <p>SKILLS</p> <a href="">Web Designer</a>
                        <br /> <a href="">Web Developer</a>
                        <br /> <a href="">WordPress</a>
                        <br /> <a href="">WooCommerce</a>
                        <br /> <a href="">PHP, .Net</a>
                        <br />
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="profile-head">
                        <h5>{{ user.prenom }} {{ user.nom.toUpperCase() }}</h5>
                        <h6>
                            <input v-model="user.mentra" class="form-control" placeholder="Entrez ici le mentra de l'employé" />
                        </h6>
                        <!-- TABS MENUS -->
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"> <i class="fas fa-home"></i>
                                    <span class="d-none d-sm-block "> A propos </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="files-tab" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false"> <i class="fas fa-file-alt"></i>
                                    <span class="d-none d-sm-block ">Fichiers </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="auth-tab" data-toggle="tab" href="#authorizations" role="tab" aria-controls="files" aria-selected="false"> <i class="fas fa-lock"></i>
                                    <span class="d-none d-sm-block "> Droits </span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="groups-tab" data-toggle="tab" href="#groups" role="tab" aria-controls="groups" aria-selected="false"> <i class="fas fa-users-cog"></i>
                                    <span class="d-none d-sm-block "> Groupes</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#messageslist" role="tab"><i class="fas fa-envelope"></i> <span class="d-none d-sm-block ">Messages <span class="badge badge-danger badge-counter"> {{this.messagesCount}}</span></span></a>
                            </li>
                        </ul>
                    </div>
                    <!-- END TABS MENUS -->
                    <!-- TABS INTRO -->
                    <div class="tab-content profile-tab" id="myTabContent">
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
                            <!-- END TABS 1 -->
                        </div>
                        <!-- TABS 2 -->
                        <div class="tab-pane fade" id="files" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="row tab-content-user">
                                <div class="col-md-6">
                                    <uploadfiles @myfilenamesevent="onFileUploads"></uploadfiles>
                                </div>
                                <div class="col-md-6">
                                    <div class="card ">
                                        <div class="card-body" style="overflow:auto;">
                                            <h5 class="card-title">
                                                <i class="fas fa-file-alt"></i> Liste des fichiers
                                            </h5>
                                            <h6 class="card-subtitle mb-2 text-muted">Gérez</h6>
                                            <div style=" font-size:0.8em;">
                                                <table class="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>Nom</th>
                                                            <th>Télécharger du FTP</th>
                                                            <th>Supprimer du Ftp</th>
                                                            <th>Permissions</th>
                                                        </tr>
                                                    </thead>
                                                    <tr v-for="file in user.filenames">
                                                        <td>
                                                            <a class="float-left"> <i class="fas fa-file-alt"></i> {{ file.filename }}</a>
                                                            <!-- When files are stored on the NODEJS SERVER , add v bind for the download link -->
                                                            <!-- <a class="float-left" v-bind:href="file.filename"> <i class="fas fa-file-alt"></i> {{ file.filename }}</a> -->
                                                        </td>
                                                        <td>
                                                            <span class="btn btn-warning" v-on:click="readFtpFile(file)">
                                                                <i class="far fa-file"></i>
                                                                <br />
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span class="remove-file btn btn-primary" v-on:click="deleteFtpFile(file)">
                                                                <i class="far fa-trash-alt"></i>
                                                                <br />
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <select class="form-control " v-model="file.middleware">
                                                                <option value="all">Tous</option>
                                                                <option v-for="u in users" :value="u._id">{{u.nom}}</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- TABS 3 -->
                        <div class="tab-pane fade" id="authorizations" role="tabpanel" aria-labelledby="authorizations-tab">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <i class="fas fa-lock"></i> Gérer les droits
                                    </h5>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label>Profil</label>
                                        </div>
                                        <div class="col-md-6">
                                            <select class="custom-select" v-model="user.role" :disabled="!creationProcess">
                                                <option value="">--Please choose an option--</option>
                                                <option value="viewer">Viewer</option>
                                                <option value="user">User</option>
                                                <option value="manager">Manager</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row" v-if="!creationProcess">
                                        <div class="col-md-2">
                                            <label>Liste des droits</label>
                                        </div>
                                        <div class="col-md-6"> <span class="badge badge-warning  badge-space" v-for="p in user.permissions"> {{p}}
                                                <br>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- END TABS 3 -->
                        </div>
                        <!-- TABS 4 -->
                        <div class="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="groups-tab">
                            <groups v-if="!creationProcess"></groups>
                        </div>
                        <!-- END TABS 4 -->
                        <!-- TABS 5 MESSAGES LIST-->
                        <div class="tab-pane fade" id="messageslist" role="tabpanel">
                            <messageslist v-if="user._id" :_id="user._id" @mymcevent="onMessagesCount"></messageslist>
                        </div>
                        <!-- END TABS 5 -->
                        <!-- END TABS INTRO -->
                    </div>
                    <!-- END COL MD 8 -->
                </div>
                <!-- END ROW -->
            </div>
            <!-- FOOTER AND BUTTONS -->
            <div class="footer fixed-bottom">
                <div class="col-md-12 text-right">
                    <div class="btn-group text-left" role="group" aria-label="Basic example">
                        <div class="" v-if="!creationProcess">
                            <button class="btn btn-secondary" v-on:click="openMessageModal()">
                                <a> <i class="fas fa-envelope"></i>
                                    <span class="d-none d-sm-block ">Message interne</span>
                                </a>
                            </button>
                            <button type="button" v-on:click="createUser()" class="btn btn-secondary"> <i class="fas fa-user-plus"></i>
                                <span class="d-none d-sm-block ">Créer un utilisateur</span>
                            </button>
                            <button type="button" v-on:click="deleteUser()" class="btn btn-danger"> <i class="fas fa-user-minus"></i>
                                <span class="d-none d-sm-block ">Supprimer Compte</span>
                            </button>
                            <button type="button" v-on:click="updateUser()" class="btn btn-secondary"> <i class="fas fa-save"></i>
                                <span class="d-none d-sm-block ">Mise à jour</span>
                            </button>
                        </div>
                        <button type="button" v-if="creationProcess" v-on:click="cancelInsertUser()" class="btn btn-secondary"> <i class="fas fa-window-close"></i>
                            <span class="d-none d-sm-block ">Cancel</span>
                        </button>
                        <button type="button" v-if="creationProcess" v-on:click="insertUser()" class="btn btn-secondary"> <i class="fas fa-user-plus"></i>
                            <span class="d-none d-sm-block ">Enregistrer utilisateur</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <!-- MODAL -->
    <modal name="messageModal" :width="350" :height="400">
        <message :user="this.user"></message>
    </modal>
</div>
</template>

<script>
/* GITHUB COMPONENTS */
import axios from "axios";
axios.defaults.withCredentials = true;
import {
    SidebarMenu
} from "vue-sidebar-menu";
import {
    required,
    minLength,
    between,
    email
} from "vuelidate/lib/validators";
/* PERSONNAL COMPONENTS */
import Uploadpicture from "@/components/Uploadpicture.vue";
import Uploadfiles from "@/components/Uploadfiles.vue";
import Message from "@/components/Message.vue";
import Messages from "@/components/Messages.vue";
import Groups from "@/components/Groups.vue";
import MessagesList from "@/components/MessagesList.vue";
export default {
    name: "Profile",
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
                filenames: [],
                job: "",
                role: "user",
                age: ""
            },
            auth: false,
            creationProcess: false,
            jobs: [],
            newJob: "",
            loaded: false,
            users: [],
            filters: {},
            messagesCount: "12",
            selectedId: ''
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
    components: {
        uploadpicture: Uploadpicture,
        uploadfiles: Uploadfiles,
        message: Message,
        messages: Messages,
        groups: Groups,
        messageslist: MessagesList
    },
    methods: {
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
                .post("/api/jobs", {
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
                .get("/api/jobs")
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
        updateJob: function () {

        },
        deleteJob: function () {

            // Getting _id from string
            var job_id = "";

            this.jobs.forEach((job, index) => {
                if (job.name == this.user.job) {
                    job_id = job._id;
                }
            })
            // building URL 
            const url = '/api/jobs/'+job_id;
            // Delete using generic_crud.js
            if (confirm("Do you really want to delete" + this.user.job + "?")) {
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
        },
        openMessageModal: function () {
            this.$modal.show("messageModal");
        },
        deleteFile(file) {
            let self = this;
            if (confirm("Do you really want to delete?")) {
                axios
                    .post("deleteFile", {
                        name: file.filename
                    })
                    .then(response => {
                        alert(" File has been deleted from server");
                        self.user.filenames = self.user.filenames.filter(function (obj) {
                            return obj.filename !== file.filename;
                        });
                        if (!this.creationProcess) {
                            this.updateUser();
                        }
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
            }
        },
        readFtpFile(file) {
            alert('I m getting your file on the ftp server, please wait.')
            let self = this;
            axios.post("readFtpFile", {
                    name: file.filename
                })
                .then(response => {
                    alert('File had been transfered to the node server');
                    axios({
                        url: file.filename, //your url 
                        method: 'GET',
                        responseType: 'blob', // important
                    }).then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', file.filename);
                        document.body.appendChild(link);
                        link.click();
                    });
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
        deleteFtpFile(file) {
            let self = this;
            if (confirm("Do you really want to delete?")) {
                axios
                    .post("deleteFtpFile", {
                        name: file.filename
                    })
                    .then(response => {
                        alert(" File has been deleted from FTP");
                        self.user.filenames = self.user.filenames.filter(function (obj) {
                            return obj.filename !== file.filename;
                        });
                        if (!this.creationProcess) {
                            this.updateUser();
                        }
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
            }
        },
        replaceByDefault(e) {
            e.target.src = "defaut.png";
        },
        onUploadPicture(value) {
            // Pass Picture URL to the user object .
            this.user.img = value;
            console.log(this.user);
        },
        onFileUploads(values) {
            let self = this;
            values.forEach(function (value) {
                // Files permissions are ALL by default
                value.permissions = "all";
                self.user.filenames.push(value);
            });
            if (!this.creationProcess) {
                this.updateUser();
            }
        },
        onMessagesCount(value) {
            console.log(value)
            console.log("onmc")
            this.messagesCount = value;
        },
        showModal() {
            // this.$modal.show('hello-world');
            this.$modal.show("dialog", {
                title: "Message",
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
        hideModal() {
            this.$modal.hide("hello-world");
        },
        readUser: function () {
            axios
                .get("readUser?_id=" + this._id)
                .then(response => {
                    this.user = response.data;
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
        updateUser: function () {
            axios
                .post("/updateUser", this.user)
                .then(response => {
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'Update is ok !'
                    });
                    // UPdating user in memory
                    localStorage.setItem('user', JSON.stringify(this.user));
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
        deleteUser: function () {
            if (confirm("Do you really want to delete?")) {
                axios
                    .post("/deleteUser", this.user)
                    .then(response => {
                        alert(" Votre compte a été supprimé ");
                        // DELETE LOGGED IN USER DATA IN THE VUEX DATA STORE
                        this.$store.commit('deleteUser')
                        this.$router.push("/login");
                        console.log(response);
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
            }
        },
        createUser: function () {
            this.creationProcess = true;
            this.user = {
                nom: "",
                prenom: "",
                phone: "",
                email: "",
                password: "",
                img: "",
                filenames: [],
                job: "",
                role: "user",
                age: ""
            };
        },
        insertUser: function () {
            if (
                !this.user.password ||
                !this.user.prenom ||
                !this.user.nom ||
                !this.user.email ||
                this.$v.user.email.$error
            ) {
                this.$notify({
                    type: 'error',
                    group: 'foo',
                    title: 'Hey! ',
                    text: 'Something is wrong, please check the fields again !'
                });
                return;
            }
            axios
                .post("/createUser", this.user)
                .then(response => {
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'Added on user!'
                    });
                    this.creationProcess = false;
                    this.user = this.$store.getters.user
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
        getAge: function () {
            var birthdate = new Date(this.user.birthday);
            var cur = new Date();
            var diff = cur - birthdate; // This is the difference in milliseconds
            var age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
            this.user.age = age;
        },
        cancelInsertUser: function () {
            this.creationProcess = false;
            this.user = this.$store.getters.user
        },
        readUsers: function () {
            axios
                .post("/readUsers", {
                    filters: this.filters
                })
                .then(response => {
                    this.users = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    beforeCreate: function () {

    },
    mounted: function () {
        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'))
        } else {
            this.user = this.$store.getters.user
        }
        this.auth = true;
        this.loaded = true;
        this.readJobs();
        this.readUsers();
    }
};
</script>

<style>
.footer {
    background-color: #2a2a2e;
    border-color: #337ab7;
    color: #FFFFFF;
}

.error {
    border-color: red;
    background: #fdd;
}

.error:focus {
    outline-color: #f99;
}

.valid {
    border-color: #5a5;
    background: #efe;
}

.valid:focus {
    outline-color: #8e8;
}

/* ---------------------------------------------------
 PROFILE
----------------------------------------------------- */
.tab-content {
    margin-bottom: 100px !important;
}

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
    color: maroon;
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
