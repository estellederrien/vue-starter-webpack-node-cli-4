// ---------------------------------- USERS CRUD -------------------------------------------
module.exports = function(app, db, permissions, bcrypt) {
    /*
     * Creating a user
     * @params JSON OBJECT : {}
     * @return Status 200
     * @error  Status 400
     */
    app.post("/createUser", permissions.requiresLoggedIn, permissions.permission_valid("CREATE_USER"), function(req, res) {

        // 1. Getting front end data
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
            user.permissions = permissions.create_permissions(user);
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
        var identifiant = req.param("id");
        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(identifiant);

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

    app.post("/updateUser", permissions.requiresLoggedIn, permissions.permission_valid("UPDATE_USER"), function(req, res) {
        // GETTIN DATA FROM FRONTEND
        var user = req.body;

        // On évite tout hacking, du coup on prends le'id et le password de la session (Pas besoin de prendre celui du front end)
        // Avoidning hacking by keeping the id and password from the session, not from the front end
        user._id = req.session.user._id;
        user.password = req.session.user.password;
        user.last_update = new Date();

        // MAJ DE LA SESSION EN MEMOIRE, SINON IL EST FAUSSE ENSUITE
        // Updateing session user object with the new data
        req.session.user = user;

        // RECORDING PHASE
        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(user._id);

        // OBLIGATOIRE DE SUPPRIMER _ID DE OBJET USER SINON LE UPDATE NE PASSE PAS SUR MONGODB (CONFLIT)
        // This is mandatory, to avoid conflict
        delete user._id;

        try {
            db.collection("users").replaceOne({ _id: idObj }, user);
            res.sendStatus(200);
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
        // gettin data from front end
        var user = req.body;

        // CONTROLE DES CHAMPS OBLIGATOIRES
        if (!user.prenom || !user.email || !user.password || !user.nom || user.password == "") {
            res.send({ problem: "Le formulaire est encore incomplet (serveur)" });
            return;
        }

        // IP FLOODING CONTROL    // TODO

        //ANONYMOUS ACCOUNT CREATION

        // Creating the user's role
        user.role = "user";

        // Creating the user's permissions
        user.permissions = permissions.create_permissions(user);

        // Setting a new empty user files array
        user.filenames = [];
        user.groups = [];

        // CONTROLE DE DOUBLONS EMAIL
        db.collection("users").findOne({ email: user.email }, function(findErr, result) {
            if (!result) {
                execute();
            } else {
                console.log("ya un doublon email");
                res.send({ problem: "doublonEmail" });
                return;
            }
        });

        function execute() {
            // HASCHAGE BCRYPT DU PASSWORD
            var hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;

            try {
                db.collection("users").insertOne(user);
                console.log("ajouté un user");
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

    app.post("/deleteUser", permissions.requiresLoggedIn, permissions.permission_valid("DELETE_USER"), function(req, res) {
        var user = req.body;
        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(user._id);

        try {
            db.collection("users").deleteOne({ _id: idObj });
            console.log("supprimé un user");
            // Delete session
            delete req.session;
            // delete_user_from_all(user);

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
        // We receive front end filters params, and we need to structure them, before using the .find() mongoDb function
        // ON reçoits les filtres du front end, on doi les strcturer pour ensuite exéctuer mongoDB .find() avec les filtres en paramêtres
        var filters = structureFilters(req.body.filters);

        // FINAL USERS READ
        db.collection("users")
            .find(filters) // find holds the front end filters
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(err);

                // Getting the user files by permissions EDIT : TOO SLOW MOOVE IT TO READ USER !!!!
                // docs = FilterByFilesPermissions(docs, req);

                // Sending the users list to the front end vue.js
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

                var users = docs.map(function(item) {
                    return item["nom"];
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
        var find = {};

        // QUERY WITH NO FILTERS :
        if (frontEndFilters === undefined || (Object.entries(frontEndFilters).length === 0 && frontEndFilters.constructor === Object)) {
            return find;
            // QUERY WITH FILTERS
        } else if (Object.entries(frontEndFilters).length !== 0 && frontEndFilters.constructor === Object) {
            cleanFilters(frontEndFilters);

            // Applying filters
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
                    if (file.permissions == "all") {
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