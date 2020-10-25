<template>
<div class="card  ">

    <div class="card-header ">
        <label><b><i class="fas fa-envelope"></i> {{t('PRIVATE_MESSAGE')}}</b></label>
        <button @click="closeModal" class="btn btn-primary float-right">X</button>
    </div>

    <div class="card-body ">
        <div class="row">

            <div class="col-md-6">
                DE {{ user.nom }} à</br>

                <multiselect v-model="to" :multiple="false" :options="users" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Choisir un destinataire !" track-by="_id" :custom-label="customLabel">
                    <template slot="singleLabel" slot-scope="props">
                        <img class="option__image" :src="props.option.img" alt="No Man’s Sky" />
                        <span class="option__desc">
                            <span class="option__title">{{ props.option.prenom}} {{ props.option.nom}}</span>
                        </span>
                    </template>
                    <template slot="option" slot-scope="props">
                        <img class="option__image" :src="props.option.img" alt="Missing picture !" />
                        <div class="option__desc">
                            <span class="option__title">{{ props.option.prenom}} {{ props.option.nom}}</span>
                            <span class="option__small">{{ props.option.desc }}</span>
                        </div>
                    </template>
                </multiselect>
                <pre class="language-json"><code>{{ value }} </code></pre>
            </div>
            <div class="col-md-6">

                Message :
                <textarea class="form-control" v-model="message.content" rows="3"></textarea>

            </div>
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
            to: {},
            value: ""
        };
    },

    methods: {

        createMessage: function () {
            this.message.to = this.to._id;
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
        closeModal: function () {
            this.$modal.hide("messageModal");
        },
        customLabel({
            nom,
            prenom
        }) {
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

.card:hover {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 1 !important;

    z-index: 10000;
}

.card {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 1;
    -webkit-transition: opacity 1s ease-in-out;
    transition: opacity 1s ease-in-out;
    z-index: 10000;
}

.multiselect--active {
    z-index: 10000;
}
</style>
