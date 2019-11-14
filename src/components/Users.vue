<template>
  <div class="container-fluid">
    <div class="row">
      <div v-for="user in users" class="col-sm col-xs-12">
        <div class="card " style="margin-bottom : 20px">
          <img
            v-bind:src="server + 'img/' + user.img"
            @error="replaceByDefault"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ user.nom }}</h5>
            <p class="card-text">Voici la description de mon profil .</p>
            <a v-on:click="route(user._id)" class="btn btn-primary float-right"
              >Profil</a
            >

            <span class="badge badge-warning" v-for="f in user.filenames">
              {{ f.filename }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "Users",

  methods: {
    replaceByDefault(e) {
      e.target.src = this.server + "defaut.png";
    },
    route: function(_id) {
      this.$router.push("/user/" + _id);
    },
    getUsers: function() {
      axios
        .post(this.server + "getUsers")
        .then(response => {
          this.users = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created: function() {
    this.getUsers();
  },
  data() {
    return {
      msg: "Welcome to Crypto Info",
      users: [
        {
          nom: "Derrien",
          id: "1",
          img: "img/h1.jpg"
        },
        {
          nom: "Floril",
          id: "2",
          img: "img/f1.jpeg"
        },
        {
          nom: "Daril",
          id: "3",
          img: "img/h2.jpeg"
        }
      ]
    };
  }
};
</script>

<style></style>
