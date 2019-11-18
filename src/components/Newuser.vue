<template>
<div>
    <label>Créer un Utilisateur</label><br>
        <select class="custom-select" v-model="new_user.role" >
            <option value="">--Please choose an option--</option>
            <option value="viewer">Viewer</option>
            <option value="user">User</option>
            <option v-if='user.role == 'administrator'' value="administrator">Administrator</option>
        </select>
    <br><br>
   
    </div>
</template>

<script>
import axios from "axios";

export default {
  /*
      Defines the data used by the component
    */
  name: "newuser",
  data() {
    return {
      new_user: ""
    };
  },

  methods: {
    /*
          Submits the file to the server
        */
    submitFile() {
      /*Initialize the form data*/
      let formData = new FormData();

      /*Add the form data we need to submit*/
      formData.append("file", this.file);

      /*Make the request to the POST /single-file URL*/
      axios
        .post(this.server + "images", formData, {
          crossdomain: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          // Send to parent component
          this.$emit("filename", response.data.filename);
        })
        .catch(err => {
          //catch never triggered
          console.log(err);
          console.log(err.response);
          console.log(JSON.stringify(err));
        });
    },

    /*
          Handles a change on the file upload
        */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.submitFile();
    }
  }
};
</script>
