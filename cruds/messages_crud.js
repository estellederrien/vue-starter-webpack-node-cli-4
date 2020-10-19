// ---------------------------------- MESSAGES CRUD -------------------------------------------
module.exports = function(app, db, middleware, Message, ObjectId) {

    /*
     * Creating a message
     * @params JSON OBJECT : {}
     * @return Status 200
     * @error  Status 400
     */
    app.post("/createMessage", function(req, res, next) {

        // 1.  Getting data from front end - on récupère le json data de l'app vue.js
        var new_message = req.body;
        console.log(new_message)
        try {
            var message = new Message({
                _id: null, // It is a new message it has no mongodb id yet - Cest un nouveau message, il n'y a pas encore d'id mongodb, il se cree lors de la phase d'insert
                to: new_message.to,
                from: new_message.from,
                content: new_message.content,
                senderName: new_message.senderName,
                senderSurname: new_message.senderSurname,
                date: new_message.date,
                id: new_message.id,
                img: new_message.img,
                date: new_message.date
            });
            db.collection("messages").insertOne(message);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });

    /*
     * Read user's messages
     * @params JSON OBJECT : {}
     * @return JSON ARRAY
     * @error  
     */
    app.post("/readUserMessages", function(req, res, next) {
        var data = req.body;
        var id = data._id;

        db.collection("messages")
            .find({ to: id })
            .toArray(function(err, docs) {
                if (err) throw err;
                res.send(docs);
            });
    });
};