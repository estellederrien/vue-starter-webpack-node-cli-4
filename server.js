// ------------------------------------ APP SETTINGS -------------------------------------------

// LOCALHOST MONGODB BDD URL
const localhostDbUrl = "mongodb://localhost:27017/";

// REMOTE MONGODB BDD URL
const remoteDbUrl =
  "mongodb+srv://jose:xxxxxx@cluster0-6kmcn.azure.mongodb.net/vue-starter-webpack?retryWrites=true&w=majority";

// DB NAME
const dbName = "vue-starter-webpack";

// ------------------------------------INITIALISATION DES LIBRAIRIES UTILISEES-------------------------------------------
const express = require("express");
const cors = require("cors");


var path = require('path');
var serveStatic = require('serve-static');
const mongodb = require("mongodb");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { MongoClient, ObjectID } = require("mongodb");

const app = express();


// ----------------------------------- MANAGING PORTS -------------------------------------------
var port = process.env.PORT || 80;


if (port == 80) {
  var url = localhostDbUrl;
} else {
  var url = remoteDbUrl;
}
// ----------------------------------- CORS -------------------------------------------

if (port == 80) {
  // LOCALHOST
  app.use(
    require("cors")({
      origin: function(origin, callback) {
        callback(null, origin);
      },
      credentials: true
    })
  );
} else {
  // AZURE AND HEROKU
  app.use(cors());
}

app.use(serveStatic(__dirname + "/dist"));


// ----------------------------------- using sessions for tracking logins -------------------------------------------
app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));
var sess = {};

// ----------------------------------- MANAGING FILES AND STATICS DIRECTORIES -----------------------------------

// distribue APPLICATION
app.use(express.static(__dirname + "/public"));

// distribue les images accessibles
app.use(express.static(__dirname + "/uploads"));

const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb"
  })
);

// create application/json parser
const jsonParser = bodyParser.json();

app.use(
  bodyParser.json({
    limit: "50mb",
    inflate: true,
    strict: false
  })
);

// -----------------------------------POOL CONNEXION DATABASE -------------------------------------------



var db;

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log(err);
    // res.send(err);
  } else {
    console.log("Connecte !!");

    // SETTING THE DB NAME WE USE ONLINE
    db = client.db(dbName);

    var permissions = require("./appSystem/permissions.js");
    require("./appSystem/auth.js")(app, db, session, bcrypt);

    // NOW WE LOAD CRUDS SEPARATLY

    require("./cruds/usersCrud.js")(app, db, permissions);
    require("./cruds/filesCrud.js")(app, db, permissions);
    require("./cruds/jobsCrud.js")(app, db, permissions);
    require("./cruds/groupsCrud.js")(app, db, permissions);
    require("./cruds/messagesCrud.js")(app, db, permissions);

    // FRESH INSTALL : IF THERE IS NO ADMIN WE NEED TO CREATE ONE
    var freshInstall = require("./appSystem/initialiseApp.js");
    freshInstall.insertAdmin(permissions, bcrypt, db);
    // FRESH INSTALL :IF THERE ARE NO STANDARD JOBS LIST WE NEED TO CREATE ONE
    freshInstall.insertJobs(permissions, db);
  }
});

// -----------------------------------FIN CONNEXION DATABASE-------------------------------------------



// ----------------------------------- END OF CORS -------------------------------------------

// -----------------------------------STARTING SERVER   -------------------------------------------

app.listen(port);
console.log('server started '+ port);



/* 
  // OPENODE et Localhost
  app.listen(80, function() {
    console.log("Example app listening on port 80!");
  });

  // AZURE
  // app.listen(8080, "0.0.0.0");
}
 */