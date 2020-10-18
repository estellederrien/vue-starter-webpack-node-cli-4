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

        },
        read_social_message() {

        },
        update_social_message() {

        },
        delete_social_message() {

        },
        read_all_social_message() {
            axios
                .post("/read_all_social_message", {
                    _id: this._id
                })
                .then(response => {
                    this.social_messages = response.data;
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        type: "error",
                        group: "foo",
                        title: "Hey! ",
                        text: error
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
