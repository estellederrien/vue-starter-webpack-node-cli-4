<template>
<div class="card">
    <div class="card-body">
        <h5 class="card-title">
            <i class="fas fa-plus"></i> Télécharger des fichiers sur le serveur
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">Maintenez la touche TAB enfoncée...</h6>
        <div class="row">
       
           
                <input  name="file" type="file" id="files" ref="files" multiple @change="handleFileUploads" />
                <!-- LOADING PIC -->
                <img v-if="loading" style="width:100px" src="../assets/img/JointRevolvingAntelopegroundsquirrel-size_restricted.gif"></img>

            
        
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
        <a v-if="files" v-on:click="submitFiles" class="btn btn-primary btn-block btn-small" style="color:white; font-size:0.8em;">Ok, placer les fichiers sur le serveur </a>
      
        </div>
    </div>

</div>


</template>

<script>
import axios from "axios";

export default {
    /*
        Defines the data used by the component
      */
    name: "uploadfiles",
    props: ["filenames"],
    data() {
        return {
            files: "",
            loading: false
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
                .post("/files", formData, {
                    headers: {
                        crossdomain: true,
                        "Content-Type": "undefined"
                    }
                })

                .then(response => {
                    this.loading = false;

                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'Files have been uploaded'
                    });
                    // Send to filenames to the parent component, Displaying them in the user component
                    this.$emit("myfilenamesevent", response.data);
                    // INITIALIZING FILES TO GET READY TO UPLOADS SOME NEWS !
                    this.files = [];

                })
                .catch(error => {
                    this.$notify({
                        type: 'error',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'Permission is missing ! -> <br> ' + error
                    });
                    console.log(error);

                });

        },
        handleFileUploads: function () {
            /*Handles a change on the file upload*/
            this.files = this.$refs.files.files;
            this.$notify({
                type: 'success',
                group: 'foo',
                title: 'Bien choisis ! ',
                text: 'Cliquez sur Soumettre pour placer les fichiers sur le serveur !'
            });
        }
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
