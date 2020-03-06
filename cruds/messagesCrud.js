// ---------------------------------- MESSAGES CRUD -------------------------------------------
module.exports = function(app, db) {
  app.post("/insertMessage", function(req, res, next) {
    var message = req.body;
    console.log(message);
    message.date = new Date();
    try {
      db.collection("messages").insertOne(message);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  app.post("/getUserMessages", function(req, res, next) {
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
