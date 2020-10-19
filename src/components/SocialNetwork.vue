<template>
<b-container fluid>
    <b-row>
        <b-col sm="2">
            <label for="textarea-small">Message de {{this.$store.getters.user.nom}}:</label>
        </b-col>
        <b-col sm="10">
            <b-form-textarea v-model =" new_social_message.content" id="textarea-small" size="sm" placeholder="Enter message"></b-form-textarea>
        </b-col>
    </b-row>
    <b-row>
        <b-button @click="create_social_message()" variant="outline-primary  block" block>Send Social network msg </b-button>
        <span v-for="sm in social_messages" class="badge badge-warning" id="textarea">{{sm.from}} says : {{sm.content}}</span>
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
    props: ["_id"],
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
            },
            // Social message list will appears, 5 by five or using an infinite scroll - La liste des messages est un array de json.
            social_messages: []
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
        // Social message crud functions
        create_social_message() {
            axios
                .post("/api/social_messages", this.new_social_message)
                .then(response => {
                    this.read_all_social_message();
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
        },
        read_social_message() {
        },
        update_social_message() {
        },
        delete_social_message() {
            // Getting _id from string
            //TODO
            /*  this.jobs.forEach((job, index) => {
                 if (job.name == this.user.job) {
                     job_id = job._id;
                 }
             }) */
            // building URL 
            const url = '/api/social_messages/' + id_to_delete;
            // Delete using generic_crud.js
            // if (confirm("Do you really want to delete : " + this.social_messages.job + " ?")) {
            axios
                .delete(url)
                .then(response => {
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: "Job had been deleted"
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
            // }
        },
        read_all_social_message() {
            axios
                .get("/api/social_messages")
                .then(response => {
                    this.social_messages = response.data;
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
        this.read_all_social_message();
        console.log(this.$store.getters.user)
    }
};
</script>
<style scoped>
</style>
