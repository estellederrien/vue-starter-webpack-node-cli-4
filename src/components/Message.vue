<template>
<div class="card mb-6 " style="padding:5px;">

    <div class="card-header ">
        <label><b><i class="fas fa-envelope"></i> {{t('PRIVATE_MESSAGE')}}</b></label>
        <button @click="closeModal" class="btn btn-primary float-right">X</button>
    </div>

    <div class="card-body d-flex flex-column" style="width:250px;">
        <div class="row">
            DE {{ user.nom }} à</br>
            A
          <!--   <select class="form-control " v-model="message.to">
                <option value="">Choisir</option>
                <option v-for="u in users" :value="u._id">{{u.nom}}</option>
            </select> -->


              <div class="col-xs-12">
              <multiselect
                v-model="to"
                :multiple="false"
                :options="users"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                placeholder="Choisir un destinataire !"
                track-by="_id"
                :custom-label="customLabel"
              >
                <template slot="singleLabel" slot-scope="props">
                  <img
                    class="option__image"
                    :src="props.option.img"
                    alt="No Man’s Sky"
                  />
                  <span class="option__desc">
                    <span class="option__title">{{ props.option.prenom}} {{ props.option.nom}}</span>
                  </span>
                </template>
                <template slot="option" slot-scope="props">
                  <img
                    class="option__image"
                    :src="props.option.img"
                    alt="Missing picture !"
                  />
                  <div class="option__desc">
                    <span class="option__title">{{ props.option.prenom}} {{ props.option.nom}}</span>
                    <span class="option__small">{{ props.option.desc }}</span>
                  </div>
                </template>
              </multiselect>
              <pre class="language-json"><code>{{ value }} </code></pre>
            </div>

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
            users: [],
            to:{},
            value:""
        };
    },

    methods: {

        createMessage: function () {
            this.message.to  = this.to._id;
            this.message.from = this.user._id;
            this.message.senderName = this.user.nom;
            this.message.senderSurname = this.user.prenom;
            this.message.img = this.user.img;
            this.message.date = new Date();
            this.message.id = this.user._id;

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
        },
        customLabel({ nom, prenom }) {
            return `${prenom}  ${nom}  `;
            }
    },
    mounted: function () {

        this.readUsers();
        
    }
};
</script>
<style scoped>
.groups-table {
  display: block;
  border: 1px solid green;
  height: 400px;
  overflow-y: scroll;
}

.option__image {
  width: 80px;
}
</style>