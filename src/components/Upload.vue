<template>
<div class="container">
    <div class="large-12 medium-12 small-12 cell">
        <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
        </label>
        <a class="btn btn-primary" v-on:click="submitFile()">Submit</a>
    </div>
</div>
</template>

<script>


import axios from "axios";

export default {
    /*
      Defines the data used by the component
    */
    name: 'upload',
    data() {
        return {
            file: ''
        }
    },

    methods: {
        /*
          Submits the file to the server
        */
        submitFile() {
            /*
                    Initialize the form data
                */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);

            /*
              Make the request to the POST /single-file URL
            */
            axios.post(this.server + 'images',
                    formData, {
                      crossdomain: true,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function (result) {
                  console.log(result);
                })
               .catch(function (error) {
                    console.log(error);
                }); 
        },

        /*
          Handles a change on the file upload
        */
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        }
    }
}
</script>
