// ---------------------------------- USERS CRUD -------------------------------------------
module.exports = function(app, db, permissions, bcrypt) {
    /*
     * Creating a user
     *
     */
    app.post("/createUser", permissions.requiresLoggedIn,permissions.permission_valid("CREATE_USER"), function(req, res) {
        
        // gettin data from front end 
        var user = req.body;

       
        // Checking mandatory fields  // CONTROLE DES CHAMPS OBLIGATOIRES
        if (!user.prenom || !user.email || !user.password || !user.nom || user.password == "") {
            res.status(403).send({ errorCode: "403" });
            return;
        }

         // Creating the user's permissions
        user.permissions = permissions.create_permissions(user);

         // Setting a new empty user files array
         user.filenames = [];

        // CONTROLE DE DOUBLONS EMAIL
        // Checking if no email duplicate
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
            // HASCHING THE USER PASSWORD
            var hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;

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
     *
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
     * Updating a user
     *
     */

    app.post("/updateUser", permissions.requiresLoggedIn,permissions.permission_valid("UPDATE_USER"),function(req, res) {
        

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
     * Register a user
     *
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

        // Creating the user's permissions
        user.role = "user";
s
        // Creating the user's permissions
        user.permissions = permissions.create_permissions(user);

        // Setting a new empty user files array
        user.filenames = [];

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
     *
     */

    app.post("/deleteUser", permissions.requiresLoggedIn,permissions.permission_valid("DELETE_USER"), function(req, res) {
        

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
     * Read all users
     *
     */

    app.post("/readUsers", function(req, res) {
        console.log(req.sessionID);
        console.log(req.body.filters);
        console.log(typeof req.body.filters);
        console.log(myFilters);

        // ------------------------------- SANS FILTRES :
        if (req.body.filters === undefined) {
            console.log("no filters");
            db.collection("users")
                .find()
                .toArray(function(err, docs) {
                    if (err) throw err;
                    console.log(err);
                    docs = FilterByFilesPermissions(docs, req);
                    getUsersGroups(docs, req)
                        .then(users => {
                            res.send(users);
                        })
                        .catch(error => {
                            // if you have an error
                        });
                });
        } else if (Object.entries(req.body.filters).length === 0 && req.body.filters.constructor === Object) {
            console.log("no filters");
            db.collection("users")
                .find()
                .toArray(function(err, docs) {
                    if (err) throw err;
                    console.log(err);
                    docs = FilterByFilesPermissions(docs, req);
                    getUsersGroups(docs, req)
                        .then(users => {
                            res.send(users);
                        })
                        .catch(error => {
                            // if you have an error
                        });
                });
        } else if (Object.entries(req.body.filters).length !== 0 && req.body.filters.constructor === Object) {
            // ------------------------------- AVEC FILTRES :

            // Gettin filters from front end
            var myFilters = req.body.filters;

            cleanFilters(myFilters);
           
             // Applying filters
            var find = {};
            find.$and = [];

            if (myFilters.role) {
                find.$and.push({ role: myFilters.role });
            }
            if (myFilters.jobs) {
                find.$and.push({ job: { $in: myFilters.jobs } });
            }

            if (myFilters.users) {
                find.$and.push({ nom: { $in: myFilters.users } });
            }
            if (myFilters.ageValues) {
                find.$and.push({ age: { $gt: myFilters.ageValues[0] } }, { age: { $lt: myFilters.ageValues[1] } });
            }

             // Call
            db.collection("users")
                .find(find)

                .toArray(function(err, docs) {
                    if (err) throw err;
                    console.log(err);
                    docs = FilterByFilesPermissions(docs, req);
                    getUsersGroups(docs, req)
                        .then(users => {
                            res.send(users);
                        })
                        .catch(error => {
                            // if you have an error
                        });
                });
        }
    });

    /*
     * Read all users for filters : Read Less data
     *
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
     *
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
     * Get the number of users
     *
     */

    app.get("/getUsersCount", function(req, res) {
        db.collection("users")
            .countDocuments()
            .then(count => {
                res.send({ result: count });
            });
    });

    // ----------------------------------------------------------------- HELPER FUNCTIONS ------------------------------------------------

    /* HELPER
     * Cleaning empty objects and array
     * Delete any empty array or object from object
     */

    function cleanFilters(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "" || !obj[propName].length) {
                delete obj[propName];
            }
        }
    }

    /**
     * Filtre les documents des utilisateurs si ils ont la permission ou pas
     *  FILTER TO CHECK IF A USER HAS THE PERMISSION TO DO SOMTHING
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


    /**
     * Async call in the purpose to know  which groups a user belongs to .
     * Pour retrouver les groupes d'un user
     */
    // CHAINER PLUSIEURS COLLECTIONS CALL EN MODE ASYNC
    async function getUsersGroups(users, req) {
        await Promise.all(
            users.map(user => {
                return db
                    .collection("groups")
                    .find({ "users._id": String(user._id) })
                    .toArray()
                    .then(group => {
                        user.groups = group;
                        console.log(group);
                    });
            })
        );

        return users;
    }
};
