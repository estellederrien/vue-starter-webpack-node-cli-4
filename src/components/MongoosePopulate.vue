<template>
<div class="container-fluid list-template">
    <div class="row">
        <div class="col-md-12 col-xs-6">
            <div class="card">
                <div class="card-body">

                    <img src="https://images.opencollective.com/frontendmasters/0b9cda4/logo/256.png"></img>
                    <h5 class="card-title">JSON SQL joints using mongoose POPULATE()<br> Insert 1 person _id and N users _id in a story object , and read it:</h5>
                    <a href=" https://mongoosejs.com/docs/populate.html"> https://mongoosejs.com/docs/populate.html</a><br><br>
                    <div class="row">
                        <div class="col-md-2">
                            <input v-model="person.name" type="text" class="form-control" :placeholder=" t('ADD') ">
                            <input v-model="person.age" type="number" :number="true" class="form-control" :placeholder=" t('ADD') ">
                            <button class="btn btn-outline-secondary " type="button" @click="create_person()">Add</button>
                        </div>
                        <div class="col-md-4">
                            <div style="overflow:auto;height:100px">
                                <li v-for="p in persons" :key="index">
                                    <b>id</b> : {{p._id}} - <b>name</b> : {{p.name}} - <b>age</b> : {{p.age}}
                                </li>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button @click="create_story()">Create a story with 2nd user as author</button>
                        </div>
                        <div class="col-md-4">
                            <div style="overflow:auto;height:100px">
                                <li v-for="s in stories" :key="index">
                                    <b>id</b> : {{s._id}} - <b>title</b> : {{s.title}} - <b>author name (Using Mongoose populate Join)</b> : {{s.author.name}}
                                </li>
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
    data() {
        return {
            person: {
                _id: null,
                name: "New Person",
                age: 20,
                creation_date: new Date(),
                stories: []
            },
            persons: [],
            story: {
                _id: null,
                author: null,
                title: "New Title",
                fans: []
            },
            stories: []
        };
    },
    methods: {
        create_person: function () {
            if (this.thing.name.length < 3) {
                alert('Too short')
                return;
            }
            axios
                .post("/generic-api/personnes", this.person)
                .then(response => {
                    this.read_persons();
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: response
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: error
                    });
                });
        },
        read_persons: function () {
            axios
                .get("/generic-api/personnes")
                .then(response => {
                    this.persons = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        create_story: function () {
            this.story.author = this.persons[1]._id
            axios
                .post("/generic-api/stories", this.story)
                .then(response => {
                    this.read_stories();
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: response
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        type: 'success',
                        group: 'foo',
                        title: 'Hey! ',
                        text: error
                    });
                });
        },
        read_stories: function () {
            axios
                .get("/readStories") // This is a Mongoose populate query - to be moove to generic_crud.js 
                .then(response => {
                    this.stories = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted: function () {
        this.read_persons();
        this.read_stories();
    }
};
</script>
<style scoped>
.card {
    margin-top: 20px
}
</style>
