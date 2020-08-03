// ---------------------------------- event CRUD -------------------------------------------
module.exports = function(app, db, permissions) {
    
    app.post("/createEvent", function(req, res) {
          
          var event = req.body;
            
          event.creation_date = new Date();
  
          if (!permissions.permission_valid("CREATE_EVENT", req)) {
              console.log(" NO RIGHTS");
              res.status(403).send({ errorCode: "403" });
              return;
          }
  
          try {
              db.collection("events").insertOne(event);
              console.log("added one event");
              res.sendStatus(200);
          } catch (e) {
              console.log(e);
              res.sendStatus(400);
          }
      });
  
      app.post("/readEvent", function(req, res) {
          var identifiant = req.param("_id");
          var ObjectId = require("mongodb").ObjectID; //working
          var idObj = ObjectId(identifiant); //working
  
          db.collection("events").findOne({ _id: idObj }, function(findErr, result) {
              if (findErr) throw findErr;
              res.send(result);
          });
      });
  
      app.post("/updateEvent",permissions.requiresLoggedIn, function(req, res) {
         
  
          if (!permissions.permission_valid("UPDATE_EVENT", req)) {
              console.log(" NO RIGHTS");
              res.status(403).send({ errorCode: "403" });
              return;
          }
  
          // GETTIN DATA FROM FRONTEND
          var event = req.body;
  
          var ObjectId = require("mongodb").ObjectID;
          var idObj = ObjectId(group._id);
  
          // OBLIGATOIRE DE SUPPRIMER _ID DE OBJET USER SINON LE UPDATE NE PASSE PAS SUR MONGODB (CONFLIT)
          delete event._id;
  
          try {
              db.collection("groups").replaceOne({ _id: idObj }, group);
              res.sendStatus(200);
          } catch (e) {
              res.sendStatus(400);
              console.log(e);
          }
      });
  
      app.post("/deleteEvent",permissions.requiresLoggedIn, function(req, res) {
         

  
          // CONTROLE DE LA PERMISSION
          if (!permissions.permission_valid("DELETE_EVENT", req)) {
              console.log(" NO RIGHTS");
              res.status(403).send({ errorCode: "403" });
              return;
          }
  
          var event = req.body;
          var ObjectId = require("mongodb").ObjectID;
          var idObj = ObjectId(group._id);
  
          try {
              db.collection("events").deleteOne({ _id: idObj });
              console.log("Deleted one event");
              res.sendStatus(200);
          } catch (e) {
              console.log(e);
              res.sendStatus(400);
          }
      });
  
      app.post("/readEvents", function(req, res) {
          db.collection("events")
              .find()
              .sort({ name: 1 })
              .toArray(function(err, docs) {
                  if (err) throw err;
                  console.log(err);
                  res.send(docs);
              });
      });
  
      // TOO COSTY ADD A PROJECTION
      // .find( {},{"projection":{"_id":1, "nom": 1,"img":1,"longitude":1,"latitude":1,"categorie":1,"selectionneurPseudo":1,"selectionneurId":1}} )
      app.post("/readEventsForFilters", function(req, res) {
          db.collection("events")
              .find()
              .sort({ name: 1 })
              .toArray(function(err, docs) {
                  if (err) throw err;
                  console.log(err);
  
                  var events = docs.map(function(item) {
                      return item["name"];
                  });
                  res.send(events);
              });
      });
  
      app.get("/searchEvents", function(req, res) {
          var eventsSearch = req.param("events");
  
          db.collection("events")
              .find({ name: { $regex: eventsSearch, $options: "i" } })
              .toArray(function(err, docs) {
                  if (err) throw err;
                  console.log(docs);
                  res.send(docs);
              });
      });
  
      app.get("/readEventsCount", function(req, res) {
          db.collection("events")
              .countDocuments()
              .then(count => {
                  res.send({ result: count });
              });
      });
  };
  