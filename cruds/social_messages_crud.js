// ---------------------------------- SOCIAL MESSAGE CRUD -------------------------------------------
module.exports = function(app, db, middleware, bcrypt, SocialMessage, ObjectId) {

        /*
         * Create a social message
         * @params JSON OBJECT : {}
         * @return Status 200
         * @error  Status 400
         */
        app.post("/create_social_message", middleware.requiresLoggedIn, middleware.permission_valid("CREATE_SOCIAL_MESSAGE"), function(req, res) {

            // 1.  Getting data from front end - on récupère le json data de l'app vue.js
            var new_social_message = req.body;

            // 2.  Trying out mongodb insert - On essaye de faire un INSERT 
            try {
                var social_message = new SocialMessage({
                    _id: null, // It is a new message it has no mongodb id yet - Cest un nouveau message, il n'y a pas encore d'id mongodb, il se cree lors de la phase d'insert
                    from: new_social_message.from,
                    to: new_social_message.to,
                    date: new_social_message.date,
                    title: new_social_message.title,
                    content: new_social_message.content,
                    user_img: new_social_message.user_img
                });
                db.collection("social_messages").insertOne(social_message);
                console.log("Added one user");
                res.sendStatus(200);
            } catch (e) {
                console.log(e);
                res.sendStatus(400);
            }
        });
        /*
         * Read social message
         * @params ID 
         * @return JSON OBJECT
         * @error
         */
        app.get("/read_social_message", function(req, res) {
            db.collection("social_message").findOne({ _id: ObjectId(req.param("_id")) }, function(findErr, result) {
                if (findErr) throw findErr;
                res.send(result);
            });
        });
        /*
         *  Update a social message
         *  @params JSON OBJECT : {}
         *  @return 200
         *  @error 400
         */
        app.post("/update_social_message", middleware.requiresLoggedIn, middleware.permission_valid("UPDATE_SOCIAL_MESSAGE"), function(req, res) {

            // 1.  Getting data from front end - on récupère le json data de l'app vue.js
            var updated_social_message = req.body;

            // 2.  Trying out mongodb update - On essaye de faire un UPDATE
            try {
                var social_message = new SocialMessage({
                    _id: updated_social_message._id,
                    title: updated_social_message.title,
                    content: updated_social_message.content
                });
                db.collection("social_message").replaceOne({ _id: updated_social_message._id }, social_message);
                res.sendStatus(200);
            } catch (e) {
                res.sendStatus(400);
                console.log(e);
            }
        });

        /*
         * Delete social message - Supprimer un message de réseau social - Please notice, COMMON APP.DELETE is not working for some unknown reasons, so I let it like this.
         * @params ID
         * @return 200
         * @error  400
         */
        app.post("/delete_social_message", middleware.requiresLoggedIn, middleware.permission_valid("DELETE_USER"), function(req, res) {
            try {
                db.collection("social_message").deleteOne({ _id: ObjectId(req.body._id) });
                console.log("SOCIAL MESSAGE have been deleted");
                res.sendStatus(200);
            } catch (e) {
                console.log(e);
                res.sendStatus(400);
            }
        });
        /*
         *  Read all SOCIAL MESSAGES
         *  @params OPTIONAL USER ID
         *  @return json array
         *  @error
         */
        app.post("/read_all_social_messages", function(req, res) {

            // 2. Final read mongoDb query
            db.collection("social_message")
                .find(filters) // find holds the front end filters
                .toArray(function(err, docs) {
                    if (err) throw err;
                    console.log(err);
                    res.send(docs);
                });
        });