// ---------------------------------- USERS CRUD -------------------------------------------
module.exports = function(app, db, middleware, bcrypt, User, ObjectId) {

    /*
     * Creating a user
     * @params JSON OBJECT : {}
     * @return Status 200
     * @error  Status 400
     */
    app.post("/createUser", middleware.requiresLoggedIn, middleware.permission_valid("CREATE_USER"), middleware.duplicate_email(db), function(req, res) {

        // 1.  Getting data from front end - on récupère le json data de l'app vue.js
        var new_user = req.body;

        // 2.  Trying out mongodb insert - On essaye de faire un INSERT
        try {
            var user = new User({
                _id: null,
                prenom: new_user.prenom,
                nom: new_user.nom,
                email: new_user.email,
                password: bcrypt.hashSync(new_user.password, 10),
                role: new_user.role,
                permissions: middleware.create_permissions(new_user.role),
                filenames: [],
                groups: [],
                last_update: new Date(),
                img: new_user.img,
                birthday: new_user.birthday,
                age: new_user.age,
                job: new_user.job,
                mentra: new_user.mentra,
            });
            db.collection("users").insertOne(user);
            console.log("Added one user");
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });
    /*
     * Reading user
     * @params INT
     * @return JSON OBJECT
     * @error
     */
    app.get("/readUser", function(req, res) {
        db.collection("users").findOne({ _id: ObjectId(req.param("_id")) }, function(findErr, result) {
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

        // 1.  Getting data from front end - on récupère le json data de l'app vue.js
        var updated_user = req.body;

        // 2.  Trying out mongodb update - On essaye de faire un UPDATE
        try {
            var user = new User({
                _id: req.session.user._id,
                prenom: updated_user.prenom,
                nom: updated_user.nom,
                email: req.session.user.email, // Email can not be changed for now
                password: req.session.user.password, //  Avoiding hacking by keeping the id and password from the session, not from the front end - On évite tout hacking, du coup on prends le'id et le password de la session (Pas besoin de prendre celui du front end)
                role: updated_user.role,
                permissions: middleware.create_permissions(updated_user.role),
                filenames: updated_user.filenames,
                groups: updated_user.groups,
                last_update: new Date(),
                img: updated_user.img,
                birthday: updated_user.birthday,
                age: updated_user.age,
                job: updated_user.job,
                mentra: updated_user.mentra,
            });
            db.collection("users").replaceOne({ _id: user._id }, user);
            //  Updating session user object with the new data - MAJ DE LA SESSION EN MEMOIRE, SINON IL EST FAUSSE ENSUITE
            req.session.user = user;
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(400);
            console.log(e);
        }
    });
    /*
     * Register anonymous user
     * @params JSON OBJECT : {}
     * @return 200
     * @error  400
     */
    app.post("/registerUser", middleware.duplicate_email(db), function(req, res) {

        // 1.  Getting data from front end - on récupère le json data de l'app vue.js
        var anonymous_user = req.body;

        // 2. IP FLOODING CONTROL    // TODO and To be mooved to the MIDDLEWARE


        // 3.  Trying out mongodb insert - On essaye de faire un INSERT
        try {
            var user = new User({
                _id: null,
                prenom: anonymous_user.prenom,
                nom: anonymous_user.nom,
                email: anonymous_user.email,
                password: bcrypt.hashSync(anonymous_user.password, 10),
                role: "user",
                permissions: middleware.create_permissions("user"),
                filenames: [],
                groups: [],
                last_update: new Date(),
                img: "",
                birthday: "",
                age: "",
                job: "",
                mentra: "",
            });
            db.collection("users").insertOne(user);
            console.log("Added one user");
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });
    /*
     * Delete user - Supprimer un user - Please notice, COMMON APP.DELETE is not working for some unknown reasons, so I let it like this.
     * @params JSON OBJECT USER : {}
     * @return 200
     * @error  400
     */
    app.post("/deleteUser", middleware.requiresLoggedIn, middleware.permission_valid("DELETE_USER"), function(req, res) {
        try {
            db.collection("users").deleteOne({ _id: ObjectId(req.body._id) });
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
        // 1. Receiving front end filters params, and we BUILD the .find() PARAMETERS  // ON reçoits les filtres du front end, on doit créer les paramêtres de la requêtes mongoDB .find()
        var filters = build_mongoDb_find_params(req.body.filters);
        // 2. Final read mongoDb query
        db.collection("users")
            .find(filters) // find holds the front end filters
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(err);
                // Getting the user files by permissions EDIT : TOO SLOW MOOVE IT TO READ USER !!!!
                // docs = FilterByFilesPermissions(docs, req);
                // 3. Sending the users list to the front end vue.js - Later there will be an infinite scroll
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
     *  Building the .find parameters using front end filters - On crée le parametre de mongoDb .find grâce aux filtres front end.
     *  @params JSON OBJECT FILTERS - {}
     *  @return JSON OBJECT - the .find() parameters
     *  @error NONE
     */
    function build_mongoDb_find_params(frontEndFilters) {
        // 1. Setting the find object
        var find = {};
        // 2. If no filters, return an empty find parameters object - Si il n'y a pas de filtres choisi dans le frontend, on retourne un objet filtres vide
        if (frontEndFilters === undefined || (Object.entries(frontEndFilters).length === 0 && frontEndFilters.constructor === Object)) {
            return find;
            // 3. If filters, return a nice find parameters object - Si il y a des filtres front end, on crée la requête .find à la volée .
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