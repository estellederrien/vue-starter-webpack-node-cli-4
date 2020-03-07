<template>
<div class="card mb-3 " style="padding:5px">

    <div class="card-header ">
        <label><b><i class="fas fa-envelope"></i> Message</b></label>
        <button @click="closeModal" class="btn btn-primary float-right">X</button>
    </div>

    <div class="card-body d-flex flex-column">
        <div class="row">
            DE {{ user.nom }} à</br>
            A
            <select class="form-control " v-model="message.to">
                <option value="">Choisir</option>
                <option v-for="u in users" :value="u._id">{{u.nom}}</option>
            </select>
            <br><br>
             <p>
            Message :
                <textarea class="form-control" v-model="message.content" rows="3"></textarea>
            </p>
        </div>
    </div>

    <div class="card-footer float-right">
        <button class="btn btn-primary float-right" v-on:click="createMessage()">Send</button>
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
            users: []
        };
    },

    methods: {

        createMessage: function () {

            this.message.from = this.user._id;
            this.message.senderName = this.user.nom;
            this.message.senderSurname = this.user.prenom;
            this.message.img = this.user.img;

            axios
                .post("/createMessage", this.message)
                .then(response => {
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'Message envoyé !'
                    });
                    this.$emit("message", this.message);
                })
                .catch(function (error) {
                    console.log(error);
                    this.$notify({
                        type: 'error',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'erreur lors de l\'envoi!'
                    });

                });
        },
        readUsers: function () {
            axios
                .post("/readUsers")
                .then(response => {
                    this.users = response.data;

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    closeModal:function(){
      this.$modal.hide("messageModal");
    }
    },
    mounted: function () {

        this.readUsers();

    }
};
</script>
