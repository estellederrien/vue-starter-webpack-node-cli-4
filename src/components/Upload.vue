<template>

    <div class="large-12 medium-12 small-12 cell">
        <a class="btn btn-primary btn-block" v-on:click="submitFile()">Télécharger</a><br><br>
        
        <label>
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
          
        </label><br><br><br>
          
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

           /*  $.post( this.server + 'images',formData, function( data ) {
                alert('ok');
                });
 */





            axios.post(this.server + 'images',
                    formData, {
                      crossdomain: true,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(response => {
                    // Send to parent component
                     this.$emit('filename', response.data.filename)
                    if(response == undefined){

                      
                    }
                    console.log(response);
                      console.log(JSON.stringify(response))
                    //the following errors out because response is undefined
                    if (response.data && response.data.success === true) {
                    }
                }).catch(err => {
                    //catch never triggered
                        console.log(err)
                        console.log(err.response) 
                        console.log(JSON.stringify(err))
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
