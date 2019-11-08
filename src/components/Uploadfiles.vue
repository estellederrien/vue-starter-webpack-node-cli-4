<template>
<div class="container">
    <div class="large-12 medium-12 small-12 cell">
        <label>Files
            <input name="file" type="file" id="files" ref="files" multiple @change="handleFileUploads" />
        </label>
        <a v-on:click="submitFiles" class="btn btn-primary">Submit</a>

        <div class="large-12 medium-12 small-12 cell">
            <div v-for="(file, key) in files" class="file-listing">{{ file.name }} <span class="remove-file btn btn-primary" v-on:click="removeFile( key )">Remove</span></div>
        </div>
        <br>
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
    data() {
        return {
            files: ''
        }
    },

    methods: {
        /*Submits the file to the server*/
        removeFile(key) {
            this.files.splice(key, 1);
        },
        submitFiles: function () {

            /*Initialize the form data*/
            var formData = new FormData();

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
                    // Send to filenames to the parent component
                    this.$emit('filenames', response.data.filenames)
                })
                .catch(function (error) 
                {
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
