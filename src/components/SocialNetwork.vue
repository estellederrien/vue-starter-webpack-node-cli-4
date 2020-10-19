<template>
<b-container fluid>
    <b-row>
        <b-col sm="2">
            <label for="textarea-small">Message from {{this.$store.getters.user.nom}}:</label>
        </b-col>
        <b-col sm="10">
            <b-form-input id="title" v-model="new_social_message.title" placeholder="Enter Title" style="margin-bottom:10px"></b-form-input>
            <b-form-textarea v-model="new_social_message.content" id="textarea-small" size="md" placeholder="Enter message" style="margin-bottom:10px"></b-form-textarea>
            <b-button @click="create_social_message()" type="button" variant="outline-primary " block>Send Social network msg </b-button>
        </b-col>
    </b-row>
    <b-row class = "list">
        <b-col sm="12">
            <b-card border-variant="dark"  no-body class="overflow-hidden card-message" v-if="user.social_messages" v-for="sm in user.social_messages">
                <b-row no-gutters>
                    <b-col md="2">
                        <b-card-img :src="sm.img" alt="Image" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="10">
                        <b-card-body >
                           <b-card-title>
                                <h4> {{sm.title}} <!-- says at {{sm.date}}: --></h4>
                           </b-card-title>
                            <b-card-text>
                                {{sm.content}}
                            </b-card-text>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card>
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
            },
            x: false
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
            this.$forceUpdate()
        },
        read_social_message() {},
        update_social_message() {},
        delete_social_message() {}
    },
    mounted: function () {
        console.log(this.user)
        console.log(this.$store.getters.user)
        this.x = false;
    }
};
</script>
<style scoped>
.list{
    margin-top:20px
}
.card-message{
  margin-top:20px
}
</style>
