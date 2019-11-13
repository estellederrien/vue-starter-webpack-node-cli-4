<template>
<div class="container">
    <div class="col-md-12">
        <label>Fichiers multiples
            <input name="file" type="file" id="files" ref="files" multiple @change="handleFileUploads" />
        </label>
        <a v-on:click="submitFiles" class="btn btn-primary btn-block">Soumettre</a>

       
            <!-- REALTIME FILE MANAGEMENT -->
            <table class="table  table-dark">
                <tbody>
                    <tr v-for="(file, key) in files" class="file-listing">
                        <th>{{ file.name }}</th>
                        <th><span class="remove-file btn btn-primary" v-on:click="removeFile( key )">Remove</span></th>
                    </tr>

                </tbody>
            </table>

        
      
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
    /*
      Defines the data used by the component
    */
    name: 'uploadfiles',
    props:['filenames'],
        data() {
        return {
            files: ''

        }
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

            /*Initialize the form data*/
            var formData = new FormData();
            var self = this;
            /*
            Iterate over any file sent over appending the files
            to the form data.
            */
            console.log(this.files);

            for (var i = 0; i < this.files.length; i++) {

                var file = this.files[i];

                formData.append('file', file);

            }

            /*Make the request to the POST /multiple-files URL*/
            axios.post(this.server + 'files',
                    formData, {
                        headers: {
                            crossdomain: true,
                            'Content-Type': 'undefined'
                        }
                    }
                ).then(function (response) {
                    // Send to filenames to the parent component, Displaying them in the user component
                    alert('Files have been uploaded ');
                    // self.filenames = response.data;
                    self.$emit('myfilenamesevent', response.data);
                    

                })
                .catch(function (error) {
                    alert('Error : please contact an admin')
                    console.log(error);
                });
                
               
        },
        handleFileUploads: function () {
            /*Handles a change on the file upload*/
            this.files = this.$refs.files.files;
        }

    }
}
</script>
