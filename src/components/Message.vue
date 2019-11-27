<template>
  <div style="padding:5px" >
    <label 
      ><b><i class="fas fa-envelope"></i> Message</b></label
    ></br>
    <div >
    DE {{ user.nom }} à</br>
    A  
    <select class="form-control " v-model="message.to">
        <option value="">Choisir</option>
        <option v-for="u in users" :value="u._id">{{u.nom}}</option>
    </select>
    <br>
    Message :

    <p>
        <textarea class="form-control" v-model="message.content" rows="3"></textarea>
    </p>

    <button class="float-right btn btn-primary" v-on:click = "insertMessage()">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "message",
  props: ["user"],
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

        this.message.from = this.user._id;
        this.message.senderName = this.user.nom;
        this.message.senderSurname = this.user.prenom;

      axios
        .post(this.server + "insertMessage", this.message)
        .then(response => {
          this.$notify({
            type: 'success',
            group: 'foo',
            title: 'Hey! ',
            text: 'Message envoyé !'
            });
          this.$emit("message", this.message);
        })
        .catch(function(error) {
          this.$notify({
            type: 'error',
            group: 'foo',
            title: 'Hey! ',
            text: 'erreur lors de l\'envoi!'
            });
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

    this.getUsers();
   
  }
};
</script>
