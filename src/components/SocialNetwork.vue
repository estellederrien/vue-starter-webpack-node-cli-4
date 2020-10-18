<template>
<div>
    social network
</div>
</template>

<script>
import axios from "axios";

export default {
    name: "socialnetwork",
    data() {
        return {
            // This JSON object must be equals to the Moongoose backend modeled object - Cet objet json doit correspondre à l'objet défini dans le répertoire MODELS (moongoose) de l'app
            new_social_message:{
                from:"",
                to:"",
                date:"",
                title:"",
                content:"",
                user_img:""
            },
            // Social message list will appears, 5 by five or using an infinite scroll - La liste des messages est un array de json.
            social_messages:[]
        };
    },

    methods: {
        // Social message crud functions
        create_social_message(){

        },
        read_social_message(){

        },
        update_social_message(){

        },
        delete_social_message(){

        }
    },
};
</script>

<style scoped>

</style>
