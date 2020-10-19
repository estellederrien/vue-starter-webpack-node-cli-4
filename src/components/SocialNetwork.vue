<template>
    <div>

    </div>
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
                from: "",
                to: "",
                date: "",
                title: "",
                content: "",
                user_img: ""
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
                    alert("Added one job !");
                    this.readJobs();
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
            const url = '/api/social_messages/'+id_to_delete;
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
                        text: 'Permission is missing ! -> <br> ' + error
                    });
                });

        }
        
    },
    mounted: function () {
        this.read_all_social_message()
    }
};
</script>

<style scoped>

</style>
