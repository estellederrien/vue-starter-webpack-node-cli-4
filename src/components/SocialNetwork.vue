<template>
<b-container fluid>
    <b-row class="list">
        <b-col sm="12">
            <b-card border-variant="dark" no-body class="overflow-hidden card-message" sv-if="user.social_messages" v-for="sm in user.social_messages">
                <b-row no-gutters>
                    <b-col md="2">
                        <b-card-img class="message-img rounded-0" v-if="sm.img !== ''" :src="sm.img" alt="Image"></b-card-img>
                        <img class="message-img rounded-0" v-if="sm.img == ''" src="../assets/img/defaut.jpg" alt="Image"></img>
                        <span style="font-size:0.8em">{{sm.from}} </span><br>
                        <span style="font-size:0.8em;color:blue">{{sm.date | moment('from', 'now') }} </span>
                    </b-col>
                    <b-col md="10"><button type="button" class="btn btn-secondary float-right" style="text-align:right" @click="delete_social_message()">X</button>
                        <button type="button" class="btn btn-warning float-right" style="text-align:right" @click="answer_social_message()">{{ t('ANSWER') }}</button>
                        <b-card-body>
                            <!-- <b-card-title style="text-align:left;">
                                <h4>      {{sm.title}} </h4>
                           </b-card-title>  -->
                            <b-card-text style="text-align:left;margin-left:20px;">
                                <b-icon icon="chat-left"></b-icon> {{sm.content }}
                            </b-card-text>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
    </b-row>
    <b-row class="new-message">
        <b-col sm="2">
            <label for="textarea-small">Add a message as <b>{{this.$store.getters.user.nom}}</b></label>
        </b-col>
        <b-col sm="10">
            <b-form-input id="title" v-model="new_social_message.title"  :placeholder=" t('ENTER_TITLE') " style="margin-bottom:10px"></b-form-input>
            <b-form-textarea v-model="new_social_message.content" id="textarea-small" size="md" :placeholder=" t('ENTER_MESSAGE') " style="margin-bottom:10px"></b-form-textarea>
            <b-button @click="create_social_message()" type="button" variant="outline-primary " block>{{ t('SEND_MESSAGE') }}</b-button>
        </b-col>
    </b-row>
</b-container>
</template>
<script>
import axios from "axios";
import {
    required,
    minLength,
    between
} from "vuelidate/lib/validators";
export default {
    name: "socialnetwork",
    props: ["user"],
    beforeCreate: function () {},
    data() {
        return {
            // This JSON object must be equals to the Moongoose backend modeled object - Cet objet json doit correspondre à l'objet défini dans le répertoire MODELS (moongoose) de l'app
            new_social_message: {
                from: this.$store.getters.user.email,
                date: new Date(),
                title: "",
                content: "",
                img: this.$store.getters.user.img
            }
        };
    },
    // Fields validation
    validations: {
        new_social_message: {
            from: {
                required,
                minLength: minLength(2)
            },
            to: {
                required,
                minLength: minLength(2)
            },
            title: {
                required,
                minLength: minLength(2)
            },
            content: {
                required,
                minLength: minLength(2),
            }
        }
    },
    methods: {
        create_social_message() {
            var submitted = Object.assign({}, this.new_social_message);
            this.user.social_messages.push(submitted);
            this.$forceUpdate();
            this.update_user_social_messages();
        },
        read_social_message() {},
        update_social_message() {},
        delete_social_message() {
            alert('Developping..')
        },
        answer_social_message() {
            alert('Developping..')
        },
        update_user_social_messages: function () {
            console.log(this.user);
            axios
                .post("/update_user_social_messages", this.user)
                .then(response => {
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'Message is recorded , hope user will like it !'
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        type: 'error',
                        group: 'foo',
                        title: 'Hey! ',
                        text: error
                    });
                });
        }
    },
    mounted: function () {
        /*         console.log(this.user)
                console.log(this.$store.getters.user) */
    }
};
</script>
<style scoped>
.list {
    margin-bottom: 20px;
}
.card-message {
    margin-top: 20px
}
.new-message {
    margin-bottom: 20px
}
.message-img {
    width: 100px;
    height: 100px;
    padding: 5px;
}
</style>
