<template>
<div class="container">

    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
        <div class="col-lg-5 mx-auto d-none d-lg-block "> 
				<div class="text-center"><img src="../assets/img/aph_refait.jpg"  style="width:200px;height:150px;margin-top:150px"></img></div>
			  </div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Créer un compte !</h1>
              </div>
              <form class="user " id="myform" >
					<div class="form-group row">
					  <div class="col-sm-6 mb-3 mb-sm-0">
						<input type="text" class="form-control form-control-user"  min="1" v-model="user.prenom"  name="prenom" value ="prenom" id="prenom" placeholder="Prénom">
					  </div>
					  <div class="col-sm-6">
						<input type="text" class="form-control form-control-user" min="1"  v-model="user.nom" name="nom" value ="nom" id="nom" placeholder="Nom">
					  </div>
					</div>
					<div class="form-group">
					  <input type="email" class="form-control form-control-user" min="1"  v-model="user.email"  name="email" value ="email" id="email" placeholder="Email">
					</div>
					<div class="form-group row">
					  <div class="col-sm-6 mb-3 mb-sm-0">
						<input type="password" class="form-control form-control-user" min="1"  v-model="user.password" value ="password" id="password" placeholder="Mot de passe">
					  </div>
					  <!-- <div class="col-sm-6">
						<input type="password" class="form-control form-control-user" name="password"value ="password" id="password" placeholder="Mot de passe">
					  </div> -->
					</div>
					<a  v-on:click='register()' class="btn btn-primary btn-user btn-block" style="color:white">
					  Enregistrement
          </a>
         <span class="badge badge-danger btn-block" v-if="problem">vous avez oublié de renseigner un champ !</span>
					<hr>
					<!-- <a href="index.html" class="btn btn-google btn-user btn-block"> -->
					  <!-- <i class="fab fa-google fa-fw"></i> Register with Google -->
					<!-- </a> -->
					<!-- <a href="index.html" class="btn btn-facebook btn-user btn-block"> -->
					  <!-- <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook -->
					<!-- </a> -->
              </form>
              <hr>
              <div class="text-center" disabled>
                <a class="small" v-on:click='login()'>Mot de passe oublié?</a>
              </div>
              <div class="text-center">
                <a class="small"  v-on:click='login()'>Déjà un compte ? S'identifier</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
 
 export default {
    name: 'Register',
    
    methods: {
    register: function() {


      console.log(this.user);

      if (
        !this.user.password ||
        !this.user.prenom ||
        !this.user.nom ||
        !this.user.email
      ) {
        this.problem = true;

        return;
      }

      axios
        .post(this.server + "registerUser", this.user)
        .then(function(reponse) {
          //On traite la suite une fois la réponse obtenue
          if (reponse.data.problem) {
            alert(reponse.data.problem);
            console.log(reponse.data.problem);
          } else {
            alert("User enregistré !");
          }
        })
        .catch(function(erreur) {
          //On traite ici les erreurs éventuellement survenues
          console.log(erreur);
        });
    }
  },
    created: function() {
       
    },
    data () {
      return {
       user: {
        nom: "",
        prenom: "",
        email: "",
        password: "",
        filenames:[]
      },
      problem:false
      }
    }
  }
</script>

<style>

</style>