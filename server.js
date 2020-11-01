// ------------------------------- 
// LOAD APP CONFIG ( FTP TOKEN,CLOUDINARY TOKEN,MONGODB ATLAS TOKEN, etc ...)- ON CHARGE LA CONFIGURATION DE L'APP ( FTP,CLOUDINARY,DB URL, etc ...)
// -------------------------------
const config = require("./config.json");
// ------------------------------
// LOAD OFFICIAL NODE MODULES - CHARGEMENT DES MODULES NODES 
// -------------------------------
const express = require("express");
const cors = require("cors");
const path = require("path");
const serveStatic = require("serve-static");
const mongodb = require("mongodb");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { MongoClient, ObjectID } = require("mongodb"); // Object is needed when CRUD updating
const ObjectId = require("mongodb").ObjectID; // This is needed in all web services for mongoDb updates :
const fs = require("fs");
const logStream = fs.createWriteStream(config.logs_path, { flags: "a" });

// Mysql
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const system = require('system-commands')

// -------------------------------
// LOAD PERSONAL MONGOOSE DATA SCHEMAS - CHARGEMENT DES SCHEMAS MONGOOSE 
// -------------------------------
const models = require('./models/models');
// ------------------------------------ 
// LOAD PERSONAL MIDDLEWARE FUNCTIONS - On charge le MIDDLEWARE , un système de controle de permissions sur les web services
// -------------------------------
const middleware = require("./appSystem/middleware.js");
// -------------------------------
// THIS IS AN EXPRESS APP
// -------------------------------
const app = express();
// -------------------------------
// MANAGING SERVER PORT - GESTION DES PORTS
// -------------------------------
const port = process.env.PORT || 80;
// -------------------------------
// CORS - GESTION DE LA PROTECTION CORS 
// -------------------------------
if (port == 80) {
    // LOCALHOST AND OPENODE 
    app.use(
        require("cors")({
            origin: function(origin, callback) {
                callback(null, origin);
            },
            credentials: true,
        })
    );
} else {
    // AZURE AND HEROKU
    app.use(cors());
}
// -------------------------------
// OTHER RELATED PORTS FUNCTIONS  (CONNEXION TO OTHERS DATABASE IF LOCALHOST)
// -------------------------------
if (port == 80) {
    // LOCALHOST AND OPENODE 
    mysql_initialize();
    mysql_crud_routes_generation();
} else {
    // It's heroku, so we need this to hide credentials: 
    get_heroku_env_vars();
}
// -------------------------------
// USING SESSIONS - UTILISATION DES SESSIONS
// -------------------------------             
app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));
// -------------------------------
// MANAGING FILES AND STATICS DIRECTORIES 
// -------------------------------
// VUE APP DIRECTORY ( GENERATED WITH NPM RUN BUILD ) // SERVING THE VUE.JS APP
app.use(serveStatic(__dirname + "/dist"));
// UPLOADS : IMAGES STORING DIRECTORY
app.use(express.static(__dirname + "/tmp"));
// UPLOADS : FILES STORING DIRECTORY
app.use(express.static(__dirname + "/tmp/files"));





// -------------------------------
// MANAGING JSON AND BODY PARSER PARAMS 
// -------------------------------
const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
    })
);
// create application/json parser
const jsonParser = bodyParser.json();
app.use(
    bodyParser.json({
        limit: "50mb",
        inflate: true,
        strict: false,
    })
);
// -------------------------------
// POOL CONNEXION DATABASE 
// -------------------------------
// This is Needed 
var db;
// Dev or prod ( Set in config.json)
if (config.dev == true) { var url = config.localhost_db; } else { var url = config.mongoDb_atlas_db; }
// DB Connexion POOL
MongoClient.connect(url, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        console.log("The DB Connexion POOL is UP ! ");
        db = client.db(config.db_name); // SETTING THE DB NAME WE USE ONLINE - Le nom de notre database
        load_auth(db);
        load_cruds(db);
        fresh_install(db);
        write_connexion_to_logs();
    }
});
// -------------------------------
// HELPER FUNCTIONS
// -------------------------------
/*
 * MongoDb atlas authentication - identification sur mongoDb atlas
 * @params db
 * @return none
 * @error  none
 */
function load_auth(db) {
    require("./appSystem/auth.js")(app, db, session, bcrypt, logStream);
}
/*
 * Load CRUD one by one - Charger les cruds un par un 
 * @params db
 * @return none
 * @error  none
 */
function load_cruds(db) {
    require("./cruds/users_crud.js")(app, db, middleware, bcrypt, models.User, ObjectId);
    require("./cruds/files_crud.js")(app, db, middleware, config.ftp_config, config.node_file_path, fs, bodyParser);
    require("./cruds/pictures_crud.js")(app, db, middleware, config.cloudinary_token);
    require("./cruds/groups_crud.js")(app, db, middleware, models.Group, ObjectId);
    require("./cruds/messages_crud.js")(app, db, middleware, models.Message, ObjectId);
    // TRYING OUT THE NEW GENERIC CRUD, NO NEED TO WRITE CRUD BACK END FILES NO MORE - ON TEST LE CRUD GENERIQUE , PLUS BESOIN DE REECRIRE UN CRUD A CAHQUE FOIS !!
    app.use('/generic-api/jobs', require("./cruds/generic_crud.js")(models.jobs, middleware));
    app.use('/generic-api/things', require("./cruds/generic_crud.js")(models.things, middleware));
    app.use('/generic-api/stories', require("./cruds/generic_crud.js")(models.stories, middleware));
    app.use('/generic-api/personness', require("./cruds/generic_crud.js")(models.personnes, middleware));
    // TRYING OUT MONGODB POPULATE
    require("./cruds/populate_cruds.js")(app, db, middleware, models.stories, ObjectId);
}



/*
 * Fresh install control - controle d' Installation initiale et vide
 * @params db
 * @return none
 * @error  none
 */
function fresh_install(db) {
    // IF THERE IS NO ADMIN WE NEED TO CREATE ONE
    var freshInstall = require("./appSystem/initialiseApp.js");
    freshInstall.insertAdmin(middleware, bcrypt, db);
    // IF THERE ARE NO STANDARD JOBS LIST WE NEED TO CREATE ONE
    freshInstall.insertJobs(middleware, db);
}
/*
 * Write db connexion to logs file - On journalise la connexion
 * @params none
 * @return none
 * @error  none
 */
function write_connexion_to_logs() {
    var d = new Date(Date.now());
    logStream.write("DB CONNEXION AT " + d.toString() + "\r\n");
    // logStream.end(''); TODO
}
/*
 * HEROKU ENV VARS : NEEDED TO HIDE ALL CREDENTIALS IN A HEROKU / GITHUB ENV . 
 * On récupère nos mots de passe des variables d'environnement stockés sur heroku, sinon, tout le monde verrait nos mots de passe .
 * @params none
 * @return none
 * @error  none
 */
function get_heroku_env_vars() {
    config.ftp_config.password = process.env.ftp_password;
    config.mongoDb_atlas_db = "mongodb+srv://jose:" + process.env.mongodb_atlas_pwd + "@cluster0-6kmcn.azure.mongodb.net/vue-starter-webpack?retryWrites=true&w=majority";
    config.cloudinary_token.api_secret = process.env.cloudinary_password;
}


// -------------------------------
// RELATIONAL DBS CONNEXIONS (MYSQL,SQLITE)
// -------------------------------


// -------------------------------
// PROXY ALL API ROUTES QUERIES TO PORT 3000 TO USE WITH MYSQL ROUTES GENERATOR https://stackoverflow.com/questions/10435407/proxy-with-express-js
// -------------------------------
var proxy = require('express-proxy-server');
app.use('/api', proxy('http://localhost:3000/api'));

/*
 * Connect mysql using sequelize
 
    Pool : max :Never have more than five open connections (max: 5)
    min : At a minimum, have zero open connections/maintain no minimum number of connections (min: 0)
    idle: Remove a connection from the pool after the connection has been idle (not been used) for 10 seconds (idle: 10000)

 * @params config.json
 * @return none
 * @error  none
 */
function mysql_connect() {
    const sequelize = new Sequelize(config.mysql.db_name, config.mysql.user, config.mysql.password, {
        dialect: config.mysql.dialect,
        host: config.mysql.host,
        port: config.mysql.port,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

}

/*
 * Create db if no exist.
 * @params config.json
 * @return none
 * @error  none
 */
async function mysql_initialize() {
    // create db if it doesn't already exist
    const token = { "user": config.mysql.user, "password": config.mysql.password };
    const connection = await mysql.createConnection(token);
    await connection.query('CREATE DATABASE IF NOT EXISTS ' + config.mysql.name + ';');
    mysql_connect();
}

/*
 * Create all Mysql DB Cruds and Routes  automatically !! - See https://github.com/o1lab/xmysql
 * Crée toutes les routes ( Post, Put, Delete, Read) et cruds NODE EXPRESS automatiquement, à partir d'une database MYSQL
 * No need to write generic back ends .
 *  GET 	/ 	Gets all REST APIs
    GET 	/api/tableName 	Lists rows of table
    POST 	/api/tableName 	Create a new row
    PUT 	/api/tableName 	Replaces existing row with new row
    POST 🔥 /api/tableName/bulk 	Create multiple rows - send object array in request body
    GET 🔥 	/api/tableName/bulk 	Lists multiple rows - /api/tableName/bulk?_ids=1,2,3
    DELETE 🔥 /api/tableName/bulk 	Deletes multiple rows - /api/tableName/bulk?_ids=1,2,3
 * @params config.json
 * @return none
 * @error  none
 */
async function mysql_crud_routes_generation() {
    system('xmysql -h localhost -u root -p password -n 3000  -d ' + config.mysql.name).then(output => {
        console.log(output)
    }).catch(error => {
        console.error(error)
    })
}
/*
 * Create models if no exist
 * @params none
 * @return none
 * @error  none
 */
async function mysql_models() {
    // init models and add them to the exported db object
    // db.User = require('../users/user.model')(sequelize);

    // sync all models with database
    // await sequelize.sync();
}

/*
 * Connect sqlite using sequelize
 * @params db
 * @return none
 * @error  none
 */
function connect_sqlite() {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'db/database.sqlite'
    });
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}
// -------------------------------
// STARTING NODE SERVER
// -------------------------------
app.listen(port);
console.log("server started " + port);
// -------------------------------
// AZURE
// -------------------------------
// app.listen(8080, "0.0.0.0"); Azure needs this port