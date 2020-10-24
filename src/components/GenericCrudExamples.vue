<template>
<div class="container-fluid list-template">
    <div class="row">
        <div class="col-md-12 col-xs-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Reusable crud : Things data model</h5>
                    <div class="row">
                        <div class="col-md-2">
                            <div class="input-group mb-3">
                                <input v-model="thing.name" type="text" class="form-control" :placeholder=" t('ADD') ">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary " type="button" @click="create_thing()">Add</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-group mb-3">
                                <select class="form-control " v-model="chosen_thing">
                                    <option value="-1"> -Select - </option>
                                    <option v-for="thing in things" :value="thing">{{thing.name}}</option>
                                </select>
                                <div class="input-group-append">
                                    <button style="color:white" class="btn btn-outline-secondary btn-danger" type="button" @click="delete_thing()">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group mb-3">
                                <input v-model="chosen_thing.name" type="text" class="form-control" :placeholder=" t('UPDATE') ">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary btn-warning" type="button" @click="update_thing()">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
// Import others components
import axios from "axios";
export default {
    name: "emptycomponent",
    data() {
        return {
            thing: {
                name: "New",
                creation_date: new Date()
            },
            things: [],
            chosen_thing: -1 // Otherwize, Select 1st option is empty
        };
    },
    methods: {
        create_thing: function () {
            if (this.thing.name.length < 3) {
                alert('Too short')
                return;
            }
            axios
                .post("/api/things", this.thing)
                .then(response => {
                    this.read_things();
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: 'Added one'
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        read_things: function () {
            axios
                .get("/api/things")
                .then(response => {
                    this.things = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        update_thing: function () {
            const url = '/api/things/' + this.chosen_thing._id ;
                axios
                    .put(url,this.chosen_thing)
                    .then(response => {
                        this.read_things();
                        this.chosen_thing = -1
                        console.log(response.status);
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        delete_thing: function () {
            const url = '/api/things/' + this.chosen_thing._id;
            // Delete using generic_crud.js
            if (confirm("Do you really want to delete : " + this.chosen_thing.name + " ?")) {
                axios
                    .delete(url)
                    .then(response => {
                        this.read_things();
                        this.chosen_thing = -1
                          console.log(response.status);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    },
    mounted: function () {
        this.read_things();
    }
};
</script>
<style scoped>
</style>
