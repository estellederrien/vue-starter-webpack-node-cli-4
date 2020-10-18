<template>
<div>
    Empty component
</div>
</template>

<script>
// Import others components
import axios from "axios";

export default {
    name: "emptycomponent",
    props: ["_id"], // Use Props variables like this : In vue router  path add for example the _id var : "/user/:_id", then in the initial module, call like that :  this.$router.push("/user/" + _id);
    beforeCreate: function () {

    },
    data() {
        return {
            var1: "Test"
        };
    },
    methods: {

    },
    mounted: function () {

    }
};
</script>

<style scoped>
</style>
