<template>
  <!-- <a class="btn btn-primary btn-block" v-on:click="submitFile()">Télécharger</a> -->

  <span>
    <label for="file" class="btn btn-secondary btn-block">
      <i class="fas fa-user-astronaut"></i>
      <span class="d-none d-sm-block">Modifier Avatar</span>
    </label>
    <input
      type="file"
      style="visibility:hidden;"
      id="file"
      ref="file"
      v-on:change="handleFileUpload()"
    />
  </span>
</template>

<script>
import axios from "axios";

export default {
  /*
      Defines the data used by the component
    */
  name: "upload",
  data() {
    return {
      file: ""
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
        .post("/createCloudinaryImage", formData, {
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
