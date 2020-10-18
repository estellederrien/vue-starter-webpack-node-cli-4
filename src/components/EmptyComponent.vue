<template>
<div>
    Empty component
<!--     /* 
    PROPS DOC :
    
    ENGLISH :        
    THERE ARE 2 WAYS TO TRANSFER PROPS VARIABLES from one module to another: 

    1. Send variable from the parent to the child component like this : 
    <socialnetwork :_id = "this._id"></socialnetwork> 
    Then, _id becomes available in the childs component using this._id

    2. Vue router
    Use Props variables like this : In vue router  path add for example the _id var : "/user/:_id", then in the initial module, call like that :  this.$router.push("/user/" + _id);
    
    FRENCH : 
    Il y a 2 façon d'envoyer une variable d'un component parent à un component enfant : 
    1. Dans le module parent : 
    <socialnetwork :_id = "this._id"></socialnetwork> 

    2. Dans le router vue.js : 
    "/user/:_id" puis dans le parent écrire  this.$router.push("/user/" + _id);

    */ -->
</div>
</template>

<script>
// Import others components
import axios from "axios";

export default {
    name: "emptycomponent",
    props: ["_id"], // SEE DOC !
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
