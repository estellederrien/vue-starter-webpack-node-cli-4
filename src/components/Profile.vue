<template>
<div>
    <div> <span v-if="!loaded">
            <img src="../assets/img/loader_800.gif" class="loader">
            </src>
        </span>
    </div>
    <div class="container-fluid user-template" v-show="loaded">
        <form method="post" v-on:submit.prevent>
            <div class="row">
                <div class="col-md-2">
                    <div class="profile-img">
                        <img v-bind:src="user.img" @error="replaceByDefault" style="width:150px" />
                        <uploadpicture @filename="onUploadPicture" v-if="this.auth" style="margin-top:10px"></uploadpicture>
                    </div>
                    <div class="profile-work col-md-2 d-none d-md-block">
                        <p>{{ t("JOB_LINKS") }}</p> <a href="">Website</a>
                        <br /> <a href="">Bootsnipp</a>
                        <br /> <a href="">Bootply</a>
                        <br>
                        <br>
                        <p>{{ t("SKILLS") }}</p> <a href="">Web Designer</a>
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
                                    <span class="d-none d-sm-block ">{{ t("ABOUT") }}</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="files-tab" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false"> <i class="fas fa-file-alt"></i>
                                    <span class="d-none d-sm-block ">{{ t("FTP_FILES") }}</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="auth-tab" data-toggle="tab" href="#authorizations" role="tab" aria-controls="files" aria-selected="false"> <i class="fas fa-lock"></i>
                                    <span class="d-none d-sm-block "> {{ t("PERMISSIONS") }}</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="groups-tab" data-toggle="tab" href="#groups" role="tab" aria-controls="groups" aria-selected="false"> <i class="fas fa-users-cog"></i>
                                    <span class="d-none d-sm-block "> {{ t("TEAMS") }}</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#messageslist" role="tab"><i class="fas fa-envelope"></i> <span class="d-none d-sm-block ">{{ t("PRIVATE_MESSAGES") }} <span class="badge badge-danger badge-counter"> {{this.messagesCount}}</span></span></a>
                            </li>
                        </ul>
                    </div>
                    <!-- END TABS MENUS -->
                    <!-- TABS INTRO -->
                    <div class="tab-content profile-tab" id="myTabContent">
                        <!-- TABS 1 -->
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                             <userform  :user="this.user" :creationProcess="this.creationProcess"></userform >
                        </div>
                        <div class="tab-pane fade" id="files" role="tabpanel" aria-labelledby="profile-tab">
                            <uploadfiles @myfilenamesevent="onFileUploads" :user="this.user"></uploadfiles>
                        </div>
                        <div class="tab-pane fade" id="authorizations" role="tabpanel" aria-labelledby="authorizations-tab">
                            <permissionslist :user="this.user" :creationProcess="this.creationProcess"></permissionslist>
                        </div>
                        <div class="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="groups-tab">
                            <groups v-if="!creationProcess"></groups>
                        </div>
                        <div class="tab-pane fade" id="messageslist" role="tabpanel">
                            <messageslist v-if="user._id" :_id="user._id" @mymcevent="onMessagesCount"></messageslist>
                        </div>
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
                                    <span class="d-none d-sm-block ">{{ t("INTERNAL_MESSENGER") }}</span>
                                </a>
                            </button>
                            <button type="button" v-on:click="createUser()" class="btn btn-secondary"> <i class="fas fa-user-plus"></i>
                                <span class="d-none d-sm-block ">{{ t("CREATE_USER") }}</span>
                            </button>
                            <button type="button" v-on:click="deleteUser()" class="btn btn-danger"> <i class="fas fa-user-minus"></i>
                                <span class="d-none d-sm-block ">{{ t("DELETE_ACCOUNT") }}</span>
                            </button>
                            <button type="button" v-on:click="updateUser()" class="btn btn-secondary"> <i class="fas fa-save"></i>
                                <span class="d-none d-sm-block ">{{ t("UPDATE_ACCOUNT") }}</span>
                            </button>
                        </div>
                        <button type="button" v-if="creationProcess" v-on:click="cancelInsertUser()" class="btn btn-secondary"> <i class="fas fa-window-close"></i>
                            <span class="d-none d-sm-block ">{{ t("CANCEL") }}</span>
                        </button>
                        <button type="button" v-if="creationProcess" v-on:click="insertUser()" class="btn btn-secondary"> <i class="fas fa-user-plus"></i>
                            <span class="d-none d-sm-block ">{{ t("INSERT_USER") }}</span>
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

/* PERSONAL COMPONENTS */
import Uploadpicture from "@/components/Uploadpicture.vue";
import Uploadfiles from "@/components/Uploadfiles.vue";
import Message from "@/components/Message.vue";
import Messages from "@/components/Messages.vue";
import Groups from "@/components/Groups.vue";
import MessagesList from "@/components/MessagesList.vue";
import PermissionsList from "@/components/PermissionsList.vue";
import UserForm from "@/components/UserForm.vue";
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
            loaded: false,
            users: [],
            filters: {},
            messagesCount: "12"
        };
    },
    components: {
        uploadpicture: Uploadpicture,
        uploadfiles: Uploadfiles,
        message: Message,
        messages: Messages,
        groups: Groups,
        messageslist: MessagesList,
        permissionslist:PermissionsList,
        userform:UserForm
    },
    methods: {
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
                .put("/updateUser", this.user)
                .then(response => {
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'Update is ok !'
                    });
                    // Updating user in memory
                    this.$store.commit('setUser', this.user) 
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
        openMessageModal: function () {
            this.$modal.show("messageModal");
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
                !this.user.email 
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
        cancelInsertUser: function () {
            this.creationProcess = false;
            this.user = this.$store.getters.user
        }
    },
    beforeCreate: function () {
    },
    created: function () {
        // console.log(this.$store.getters.user)
        // this.user = this.$store.getters.user; // To repair
         this.user = JSON.parse(localStorage.getItem("user"));
        
        this.auth = true;
        this.loaded = true;
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
    padding-top: -50px !important;
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
