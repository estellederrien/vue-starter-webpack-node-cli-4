// ---------------------------------- GROUP CRUD -------------------------------------------
module.exports = function(app, db, middleware, Group, ObjectId) {

    /*
     * Create a group - Créer un groupe d'utilisateurs
     * @params JSON object (see group.js for schema)
     * @return Status 200
     * @error  Status 400
     */
    app.post("/createGroup", middleware.permission_valid("CREATE_GROUP"), middleware.duplicate_name(db, "groups"), function(req, res) {
        // 1.  Getting data from front end 
        var new_group = req.body;
        // 2. Try an insert
        try {
            var group = new Group({
                _id: null,
                name: new_group.name,
                creation_date: new Date(),
                users: new_group.users
            })
            db.collection("groups").insertOne(group);
            console.log("added one group");
            res.sendStatus(200);
            // Ugly momentaneus way to inject groups to users documents, in the purpose to improve the read_users ws perfs
            injectGroups(req, res);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });
    /*
     * Read group ( so his users)- Lire un groupe ( et donc ses utilisateurs)
     * @param INT
     * @return JSON ARRAY
     * @error 400
     */
    app.post("/readGroup", function(req, res) {
        try {
            db.collection("groups").findOne({ _id: ObjectId(req.param("_id")) }, function(findErr, result) {
                if (findErr) throw findErr;
                res.send(result);
            });

        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });
    /*
     * Update group - Mettre à jour un groupe
     * @params JSON object (see group.js for schema)
     * @return 200
     * @error  400
     */
    app.post("/updateGroup", middleware.requiresLoggedIn, middleware.permission_valid("UPDATE_GROUP"), function(req, res) {
        // 1.  Getting data from front end 
        var updated_group = req.body;

        // 2. Trying out the update group query
        try {
            var group = new Group({
                _id: updated_group._id,
                name: updated_group.name,
                creation_date: updated_group.creation_date,
                users: updated_group.users
            })

            db.collection("groups").replaceOne({ _id: ObjectId(updated_group._id) }, group);
            res.sendStatus(200);
            // Ugly momentaneus way to inject groups to users documents, in the purpose to improve the read_users ws perfs
            injectGroups(req, res);
        } catch (e) {
            res.sendStatus(400);
            console.log(e);
        }
    });
    /*
     * Delete a group - Supprimer un groupe
     * @params INT
     * @return 200
     * @error  400
     */
    app.post("/deleteGroup", middleware.requiresLoggedIn, middleware.permission_valid("DELETE_GROUP"), function(req, res) {
        var group = req.body;
        try {
            db.collection("groups").deleteOne({ _id: ObjectId(group._id) });
            console.log("Deleted one group");
            res.sendStatus(200);
            injectGroups(req, res);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });
    /*
     * Read groups
     * @return json ARRAY
     * @error
     */
    app.get("/readGroups", function(req, res) {
        db.collection("groups")
            .find()
            .sort({ name: 1 })
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(err);
                res.send(docs);
            });
    });
    /*
     * Read groups for filters ( Read less data)
     * @return json ARRAY
     * @error
     */
    // TOO COSTY ADD A PROJECTION
    // .find( {},{"projection":{"_id":1, "nom": 1,"img":1,"longitude":1,"latitude":1,"categorie":1,"selectionneurPseudo":1,"selectionneurId":1}} )
    app.post("/readGroupsForFilters", function(req, res) {
        db.collection("groups")
            .find()
            .sort({ name: 1 })
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(err);
                var groups = docs.map(function(item) {
                    return item["name"];
                });
                res.send(groups);
            });
    });
    /*
     * Search a group
     * @return json ARRAY
     * @error
     */
    app.get("/searchGroups", function(req, res) {
        var groupSearch = req.param("groups");
        db.collection("groups")
            .find({ name: { $regex: groupSearch, $options: "i" } })
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(docs);
                res.send(docs);
            });
    });
    /*
     * Read groups count
     * @return json OBJECT
     * @error
     */
    app.get("/readGroupsCount", function(req, res) {
        db.collection("groups")
            .countDocuments()
            .then((count) => {
                res.send({ result: count });
            });
    });
    /*
     * Find which groups a user belongs to , then copying the group list inside the user JSON object on mongodb atlas.
     * Retrouve les groupes d'un user, puis ecrit la liste de ses groupes dans son document json sur mongodb atlas
     * @return JSON ARRAY users including his groups
     * @error none
     */
    async function getUsersGroups(users, req, res) {
        await Promise.all(
            users.map((user) => {
                return db
                    .collection("groups")
                    .find({ "users._id": String(user._id) })
                    .toArray()
                    .then((group) => {
                        user.groups = [];
                        group.forEach(function(obj) {
                                user.groups.push(obj.name);
                            })
                            // console.log(group);
                        try {
                            db.collection("users").replaceOne({ _id: user._id }, user);
                        } catch (e) {
                            console.log(e);
                        }
                    });
            })
        );
        return users;
    }
    /*
     * Find which groups a user belongs to , then copying the group list inside the user JSON object on mongodb atlas.
     * Retrouve les groupes d'un user, puis ecrit la liste de ses groupes dans son document json sur mongodb atlas
     * @return NONE
     * @error NONE
     */
    function injectGroups(req, res) {
        db.collection("users").find().toArray(function(err, docs) {
            if (err) throw err;
            console.log(err);
            getUsersGroups(docs, req)
                .then((users) => {
                    console.log("ok");
                })
                .catch((error) => {
                    // if you have an error
                    console.log(error);
                });
        });
    }
};