// ---------------------------------- MESSAGES CRUD -------------------------------------------
module.exports = function(app, db, Message, ObjectId) {

    /* MESSAGE MODEL*/
    let message = {
        _id: "",
        to: "",
        from: "",
        content: "",
        senderName: "",
        senderSurname: "",
        date: "",
        id: "",
        img: "",
        date: ""
    }

    /*
     * Creating a message
     * @return Status 200
     * @error  Status 400
     */
    app.post("/createMessage", function(req, res, next) {
        var message = req.body;
        message.date = new Date();
        try {
            db.collection("messages").insertOne(message);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });

    /*
     * Read user's messages
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