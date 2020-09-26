// ---------------------------------- USERS CRUD -------------------------------------------
module.exports = function(app, db, middleware, bcrypt) {
    /*
     * Creating a user
     * @params JSON OBJECT : {}
     * @return Status 200
     * @error  Status 400
     */
    app.post("/createUser", middleware.requiresLoggedIn, middleware.permission_valid("CREATE_USER"), function(req, res) {

        // 1. Receiving front end data - On reçoit le data du front end
        var user = req.body;

        // 2. Checking mandatory fields presence - Controle présence des champs obligatoires. 
        if (!user.prenom || !user.email || !user.password || !user.nom || user.password == "") {
            res.status(403).send({ errorCode: "403" });
            return;
        }

        // 3. Checking if no email duplicate - Controle si il y a un doublon EMAIL To be mooved to the MIDDLEWARE
        db.collection("users").findOne({ email: user.email }, function(findErr, result) {
            if (!result) {
                execute();
            } else {
                console.log("Sorry , there is a duplicate Email, This is Forbidden");
                res.send({ problem: "doublonEmail" });
                return;
            }
        });


        function execute() {

            // Creating the user's permissions ( Chosen by the front end , inside of user.role) - On crée les permissions de l'utilisateur en fonction du role choisi dans le front end
            user.permissions = middleware.create_permissions(user);
            // Setting a new empty user files array - On crée un tableau qui contiendra les fichiers de l'utilisateur
            user.filenames = [];
            // Setting a new empty user groups array - On crée un tableau qui contiendra les groupes de l'utilisateur
            user.groups = [];
            // HASCHING THE USER PASSWORD - HASCHAGE BCRYPT DU PASSWORD
            var hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
            // MongodDb Final Insert Query
            try {
                db.collection("users").insertOne(user);
                console.log("Added one user");
                res.sendStatus(200);
            } catch (e) {
                console.log(e);
                res.sendStatus(400);
            }
        }
    });

    /*
     * Reading a user
     * @params JSON OBJECT : {id: this.id}
     * @return JSON OBJECT
     * @error
     */

    app.post("/readUser", function(req, res) {

        // 1. Formatting the received id as a mongoDb ObjectId - On formatte l'identifiant utilisateur en un id de type mongoDb .
        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(req.param("id"));

        // 2. MongodDb Final Query
        db.collection("users").findOne({ _id: idObj }, function(findErr, result) {
            if (findErr) throw findErr;
            res.send(result);
        });
    });

    /*
     *  Updating a user
     *  @params JSON OBJECT : {}
     *  @return 200
     *  @error 400
     */

    app.post("/updateUser", middleware.requiresLoggedIn, middleware.permission_valid("UPDATE_USER"), function(req, res) {

        // 1. Receiving Front end Data - On reçois le data du front end .
        var user = req.body;

        // 2. Avoiding hacking by keeping the id and password from the session, not from the front end - On évite tout hacking, du coup on prends le'id et le password de la session (Pas besoin de prendre celui du front end)      
        user._id = req.session.user._id;
        user.password = req.session.user.password;

        // 3. Adding the last date update
        user.last_update = new Date();

        // 4. Formatting the received id as a mongoDb ObjectId - On formatte l'identifiant utilisateur en un id de type mongoDb .
        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(user._id);

        // 5. This is mandatory, to avoid conflict during the mongoDb update -  OBLIGATOIRE DE SUPPRIMER _ID DE OBJET USER SINON LE UPDATE NE PASSE PAS SUR MONGODB (CONFLIT)
        delete user._id;

        // 6. Final mongoDb QUERY
        try {
            db.collection("users").replaceOne({ _id: idObj }, user);
            res.sendStatus(200);
            // 7. Updating session user object with the new data - MAJ DE LA SESSION EN MEMOIRE, SINON IL EST FAUSSE ENSUITE
            req.session.user = user;
        } catch (e) {
            res.sendStatus(400);
            console.log(e);
        }
    });

    /*
     * Register an anonymous user
     * @params JSON OBJECT : {}
     * @return 200
     * @error  400
     */

    app.post("/registerUser", function(req, res) {

        // 1. Receiving Front end Data - On reçois le data du front end .
        var user = req.body;

        // 2. Checking mandatory fields presence - Controle présence des champs obligatoires. 
        if (!user.prenom || !user.email || !user.password || !user.nom || user.password == "") {
            res.send({ problem: "Le formulaire est encore incomplet (serveur)" });
            return;
        }

        // 3. IP FLOODING CONTROL    // TODO

        // 4. CONTROLE DE DOUBLONS EMAIL
        db.collection("users").findOne({ email: user.email }, function(findErr, result) {
            if (!result) {
                execute();
            } else {
                console.log("ya un doublon email");
                res.send({ problem: "doublonEmail" });
                return;
            }
        });


        // 5. Creating the user's role
        user.role = "user";

        // 6. Creating the user's permissions
        user.permissions = middleware.create_permissions(user);

        // 7. Setting a new empty user files array
        user.filenames = [];

        // 8. Setting a new empty user groups array
        user.groups = [];

        // 9. Adding no user img
        user.img = "";
        // 10. Final insert mongoDb query
        function execute() {
            // HASCHAGE BCRYPT DU PASSWORD
            var hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;

            try {
                db.collection("users").insertOne(user);
                console.log("A user have been added  !");
                res.sendStatus(200);
            } catch (e) {
                console.log(e);
                res.sendStatus(400);
            }
        }
    });

    /*
     * Delete a user
     * @params JSON OBJECT : {}
     * @return 200
     * @error  400
     */

    app.post("/deleteUser", middleware.requiresLoggedIn, middleware.permission_valid("DELETE_USER"), function(req, res) {

        // 1. Receiving Front end Data - On reçois le data du front end .
        var user = req.body;

        // 2. Formatting the received id as a mongoDb ObjectId - On formatte l'identifiant utilisateur en un id de type mongoDb .
        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(user._id);

        // 3. Final delete mongoDb query
        try {
            db.collection("users").deleteOne({ _id: idObj });
            console.log("User have been deleted");
            // Delete session
            delete req.session;
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });

    /*
     *  Read all users
     *  @params FILTERS JSON OBJECT : {}
     *  @return json array
     *  @error
     */

    app.post("/readUsers", function(req, res) {

        // 1. We receive front end filters params, and we need to structure them, before using the .find() mongoDb function   // ON reçoits les filtres du front end, on doi les strcturer pour ensuite exéctuer mongoDB .find() avec les filtres en paramêtres
        var filters = structureFilters(req.body.filters);

        // 2. Final read mongoDb query
        db.collection("users")
            .find(filters) // find holds the front end filters
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(err);

                // Getting the user files by permissions EDIT : TOO SLOW MOOVE IT TO READ USER !!!!
                // docs = FilterByFilesPermissions(docs, req);

                // 3. Sending the users list to the front end vue.js
                res.send(docs);
            });
    });

    /*
     * Read all users for filters : Read Less data
     *  @return json array
     *  @error
     */
    // .find( {},{"projection":{"_id":1, "nom": 1,"img":1,"longitude":1,"latitude":1,"categorie":1,"selectionneurPseudo":1,"selectionneurId":1}} )
    app.post("/readUsersForFilters", function(req, res) {
        db.collection("users")
            .find()
            .sort({ nom: 1 })
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(err);
                // We only send names to the front end, allowing fast html select reacts - On envoie seulement les noms des users pour que les filtres marchents vite .
                var users = docs.map(function(item) {
                    return item["nom"];
                    // return { "firstName": item["prenom"], "lastName": item["nom"] };
                });
                res.send(users);
            });
    });

    /*
     * Search user by pseudo
     *  @params ?
     *  @return json array
     *  @error NONE
     */

    app.get("/searchUsers", function(req, res) {
        var pseudoSearch = req.param("pseudo");

        db.collection("users")
            .find({ pseudo: { $regex: pseudoSearch, $options: "i" } })
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(docs);
                res.send(docs);
            });
    });

    /*
     * Counting users
     *  @params NONE
     *  @return json object
     *  @error NONE
     */

    app.get("/getUsersCount", function(req, res) {
        db.collection("users")
            .countDocuments()
            .then((count) => {
                res.send({ result: count });
            });
    });

    // ----------------------------------------------------------------- HELPER FUNCTIONS ------------------------------------------------

    /*
     *  Structuring front end filters, for the .find mongodDb function
     *  @params JSON OBJECT FILTERS {}
     *  @return JSON OBJECT find
     *  @error NONE
     */

    function structureFilters(frontEndFilters) {

        // 1. Setting the find object
        var find = {};

        // 2. If no filters, return an empty find object - Si il n'y a pas de filtres choisi dans le frontend, on retourne un objet filtres vide
        if (frontEndFilters === undefined || (Object.entries(frontEndFilters).length === 0 && frontEndFilters.constructor === Object)) {
            return find;
            // 3. If filters, return a nice find object - Si il y a des filtres front end, on crée la requête .find à la volée .
        } else if (Object.entries(frontEndFilters).length !== 0 && frontEndFilters.constructor === Object) {
            cleanFilters(frontEndFilters);

            // Building the .find query !
            find.$and = [];

            if (frontEndFilters.role) {
                find.$and.push({ role: frontEndFilters.role });
            }
            if (frontEndFilters.jobs) {
                find.$and.push({ job: { $in: frontEndFilters.jobs } });
            }
            if (frontEndFilters.users) {
                find.$and.push({ nom: { $in: frontEndFilters.users } });
            }
            if (frontEndFilters.ageValues) {
                find.$and.push({ age: { $gt: frontEndFilters.ageValues[0] } }, { age: { $lt: frontEndFilters.ageValues[1] } });
            }
            if (frontEndFilters.groups) {
                find.$and.push({ groups: { $in: frontEndFilters.groups } });
            }

            return find;
        }
    }

    /* HELPER
     * Cleaning empty objects and array
     * Delete any empty array or object from object
     * @params OBJECT
     * @return none
     * @error none
     */

    function cleanFilters(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "" || !obj[propName].length) {
                delete obj[propName];
            }
        }
    }

    /*
     * 
     * FILTER TO CHECK IF A USER HAS THE PERMISSION TO DO SOMTHING
     * Filtre les documents des utilisateurs si ils ont la permission ou pas
     * @params JSON ARRAY
     * @return JSON ARRAY docs
     * @error none
     */
    function FilterByFilesPermissions(docs, req) {
        docs.forEach(function(doc) {
            if (doc.filnames) {
                // If user own docs
                doc.filenames.forEach(function(file, index, object) {
                    if (file.permission == "all") {
                        // We keep the file for display
                    } else if (req.session.loggedIn) {
                        if (file.permissions == req.session.user._id) {
                            // We keep the file for display
                        }
                    } else {
                        object.splice(index, 1);
                    }
                });
            }
        });
        return docs;
    }


};