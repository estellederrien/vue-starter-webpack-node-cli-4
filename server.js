// ------------------------------------ APP SETTINGS -------------------------------------------

// When developping on a localhost database , set it to true
var dev = false;

if (dev == true) {
    var url = "mongodb://localhost:27017/"; // LOCALHOST MONGODB BDD URL
} else {
    var url = "mongodb+srv://jose:windsurf@cluster0-6kmcn.azure.mongodb.net/vue-starter-webpack?retryWrites=true&w=majority"; // REMOTE MONGODB BDD URL
}

// DB NAME
const dbName = "vue-starter-webpack";

// ------------------------------------INIT LIBS -------------------------------------------
const express = require("express");
const cors = require("cors");
const path = require("path");
const serveStatic = require("serve-static");
const mongodb = require("mongodb");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { MongoClient, ObjectID } = require("mongodb"); // Object is needed when CRUD updating

// SETTING THE APP
const app = express();

// ----------------------------------- MANAGING SERVER PORT -------------------------------------------

var port = process.env.PORT || 80;

// ----------------------------------- CORS -----------------------------------------------------------

if (port == 80) {
    // LOCALHOST AND OPENODE
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

// ----------------------------------- Using sessions                 -------------------------------------------
app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));
var sess = {};

// ----------------------------------- MANAGING FILES AND STATICS DIRECTORIES -----------------------------------

// VUE APP DIRECTORY ( GENERATED WITH NPM RUN BUILD )
app.use(serveStatic(__dirname + "/dist"));

// UPLOADS : IMAGES STORING DIRECTORY
app.use(express.static(__dirname + "/tmp"));

// UPLOADS : FILES STORING DIRECTORY
app.use(express.static(__dirname + "/tmp/files"));
// ----------------------------------- MANAGING JSON AND BODY PARSER PARAMS -----------------------------------
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


// ----------------------------------- POOL CONNEXION DATABASE -------------------------------------------

var db;

MongoClient.connect(url, function(err, client) {
    if (err) {
        console.log(err);
    } else {

        console.log("The DB Connexion POOL is UP !!");

        // SETTING THE DB NAME WE USE ONLINE - Le nom de notre database
        db = client.db(dbName);

        // LOADING THE AUTHENTIFICATION SYSTEM - ON cahrge le système d'authentification
        require("./appSystem/auth.js")(app, db, session, bcrypt);

        // LOADING THE PERMISSIONS CONTROL AND LOGGED IN CONTROL MIDDLEWARE - On charge le système de controle de permissions et le controle de logged in
        var permissions = require("./appSystem/permissions.js");

        // LOADING CRUDS ONE BY ONE - On charge les cruds un par un

        require("./cruds/usersCrud.js")(app, db, permissions, bcrypt);
        require("./cruds/filesCrud.js")(app, db, permissions);
        require("./cruds/picturesCrud.js")(app, db, permissions);
        require("./cruds/jobsCrud.js")(app, db, permissions);
        require("./cruds/groupsCrud.js")(app, db, permissions);
        require("./cruds/messagesCrud.js")(app, db, permissions);

        // FRESH INSTALL CONTROL: IF THERE IS NO ADMIN WE NEED TO CREATE ONE
        var freshInstall = require("./appSystem/initialiseApp.js");
        freshInstall.insertAdmin(permissions, bcrypt, db);

        // FRESH INSTALL CONTROL :IF THERE ARE NO STANDARD JOBS LIST WE NEED TO CREATE ONE
        freshInstall.insertJobs(permissions, db);
    }
});

// -----------------------------------FIN CONNEXION DATABASE-------------------------------------------

// -----------------------------------STARTING SERVER   -------------------------------------------

app.listen(port);
console.log("server started " + port);
// AZURE
// app.listen(8080, "0.0.0.0"); Azure needs this port

// ----------------------------------END STARTING SERVER   -------------------------------------------