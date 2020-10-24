<template>
<div class="row tab-content-user">
    <div class="col-md-6">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"><i class="fas fa-plus"></i> Télécharger des fichiers sur le serveur</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    Maintenez la touche TAB enfoncée...
                </h6>
                <div class="row">
                    <input name="file" type="file" id="files" ref="files" multiple @change="handleFileUploads" />
                    <!-- LOADING PIC -->
                    <img v-if="loading" style="width:100px" src="../assets/img/loader_def.gif" />

                    <label v-if="files">Preview :</label>
                    <!-- REALTIME FILE MANAGEMENT -->
                    <table class="table table-dark table-sm">
                        <tbody>
                            <tr v-for="(file, key) in files">
                                <th>{{ file.name }}</th>
                                <th>
                                    <span class="remove-file btn btn-primary" v-on:click="removeFile(key)">-</span>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <a v-if="files" v-on:click="submitFiles" class="btn btn-primary btn-block btn-small" style="color:white; font-size:0.8em;">Ok, placer les fichiers sur le serveur
                    </a>
                </div>
            </div>
        </div>
    </div>
 <div class="col-md-6">
        <div class="card ">
            <div class="card-body" style="overflow:auto;">
                <h5 class="card-title">
                    <i class="fas fa-file-alt"></i> {{ t("FILE_LISTS") }}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ t("MANAGE") }}</h6>
                <div style=" font-size:0.8em;">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>{{ t("NAME") }}</th>
                                <th>{{ t("FTP_DOWNLOAD") }}</th>
                                <th>{{ t("FTP_DELETE") }}</th>
                                <th>{{ t("PERMISSIONS") }}</th>
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


</template>

<script>
import axios from "axios";

export default {
    name: "uploadfiles",
    props: ["filenames","user"], // USER OBJECT IS COMING FROM PROFILE.JS !
    data() {
        return {
            files: "",
            loading: false,
        };
    },

    methods: {
        removeFile(key) {
            var newList = [];

            for (var i = 0; i < this.files.length; i++) {
                if (i !== key) {
                    newList.push(this.files[i]);
                }
            }
            this.files = newList;
        },
        submitFiles: function () {
            this.loading = true;
            /*Initialize the form data*/
            var formData = new FormData();

            /*
    Iterate over any file sent over appending the files
    to the form data.
    */
            console.log(this.files);

            for (var i = 0; i < this.files.length; i++) {
                var file = this.files[i];

                formData.append("file", file);
            }

            /*Make the request to the POST /multiple-files URL*/
            axios
                .post("/createFtpFiles", formData, {
                    headers: {
                        crossdomain: true,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    this.loading = false;

                    this.$notify({
                        type: "success",
                        group: "foo",
                        title: "Hey! ",
                        text: "Files have been uploaded",
                    });
                    // Send to filenames to the parent component, Displaying them in the profile and user component
                    this.$emit("myfilenamesevent", response.data);
                    // INITIALIZING FILES TO GET READY TO UPLOADS SOME NEWS !
                    this.files = [];
                })
                .catch((error) => {
                    this.$notify({
                        type: "error",
                        group: "foo",
                        title: "Hey! ",
                        text: "Permission is missing ! -> <br> " + error,
                    });
                    console.log(error);
                });
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
        handleFileUploads: function () {
            /*Handles a change on the file upload*/
            this.files = this.$refs.files.files;
            this.$notify({
                type: "success",
                group: "foo",
                title: "Bien choisis ! ",
                text: "Cliquez sur Soumettre pour placer les fichiers sur le serveur !",
            });
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
    mounted: function () {

        // this.user = this.$store.getters.user

    }
};
</script>

<style scoped>
.type {
    font-size: 0.8em;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .FileListDiv {
        font-size: 11px;
        padding: 4px 6px;
        height: 15px;
    }

    .tb {
        font-size: 11px;
    }
}

@media (min-width: 768px) {
    .FileListDiv {
        font-size: 12px;
        padding: 6px 12px;
        height: 200px;
    }
}
</style>
