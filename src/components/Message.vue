<template>
  <div>
    <label style="padding:5px"
      ><b><i class="fas fa-filter"></i> Message</b></label
    ></br>
    
    DE {{ from }} à</br>
    A  
    <select class="form-control " v-model="message.to">
        <option value="">Choisir</option>
        <option v-for="u in users" :value="u._id">{{u.nom}}</option>
    </select>

    Message :

    <p>
        <textarea class="form-control" v-model="message.content" rows="3"></textarea>
    </p>

    <button class="float-right btn btn-primary" v-on:click = "insertMessage()">Send</button>

  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "message",
  props: ["from"],
  data() {
    return {
      message: {
        to: "",
        content: ""
      },
      users:[]
    };
  },

  methods: {
    
    insertMessage: function() {

        this.message.from = this.from;
        console.log(this.message);

      axios
        .post(this.server + "insertMessage", this.message)
        .then(response => {
          alert("Added one message !");
          this.$emit("message", this.message);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUsers: function() {
       axios
            .post(this.server + "getUsers", {filters: { role: "", job: "" }})
            .then(response => {
            
            this.users = response.data;
            
            
            })
            .catch(function(error) {
            console.log(error);
            });
    }
    },
   mounted: function() {
console.log("comin from components");
    this.getUsers();
   
  }
};
</script>
