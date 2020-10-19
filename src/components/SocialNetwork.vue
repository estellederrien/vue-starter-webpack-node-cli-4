<template>
<b-container fluid>
    <b-row>
        <b-col sm="2">
            <label for="textarea-small">Message de {{this.$store.getters.user.nom}}:</label>
        </b-col>
        <b-col sm="10">
            <b-form-textarea v-model=" new_social_message.content" id="textarea-small" size="sm" placeholder="Enter message"></b-form-textarea>
        </b-col>
    </b-row>
    <b-row>
        <b-button @click="create_social_message()" type="button" variant="outline-primary  block" block>Send Social network msg </b-button>
        <span v-if="user.social_messages" v-for="sm in user.social_messages" class="badge badge-warning">
            {{sm.from}} says : {{sm.content}}
            <button type="button" @click="delete_social_message(sm._id)">X</button>
        </span>
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
                from: "test@test.fr",
                to: "test@test.fr",
                date: new Date(),
                title: "test@test.fr",
                content: "",
                user_img: "test@test.fr"
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
            this.$forceUpdate()
        },
        read_social_message() {},
        update_social_message() {},
        delete_social_message() {}
    },
    mounted: function () {
        console.log(this.user)
    }
};
</script>
<style scoped>
</style>
