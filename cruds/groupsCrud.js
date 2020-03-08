// ---------------------------------- GROUP CRUD -------------------------------------------
module.exports = function(app, db, permissions) {
    
  app.post("/createGroup", function(req, res) {
        var group = req.body;

        group.creation_date = new Date();

        if (!permissions.permission_valid("CREATE_GROUP", req)) {
            console.log(" NO RIGHTS");
            res.status(403).send({ errorCode: "403" });
            return;
        }

        // CONTROLE DE DOUBLONS

              /*   db.collection("groups").findOne({ name:group.name }, function(
          findErr,
          result
        ) {
          if (!result) {
            execute(); // executer insert si pas de doublon
          } else {
            return;
          }
        }); */

        try {
            db.collection("groups").insertOne(group);
            console.log("added one group");
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });

    app.post("/readGroup", function(req, res) {
        var identifiant = req.param("_id");
        var ObjectId = require("mongodb").ObjectID; //working
        var idObj = ObjectId(identifiant); //working

        db.collection("groups").findOne({ _id: idObj }, function(findErr, result) {
            if (findErr) throw findErr;
            res.send(result);
        });
    });

    app.post("/updateGroup", permissions.requiresLoggedIn,permissions.permission_valid("UPDATE_GROUP"), function(req, res) {
    

        // GETTIN DATA FROM FRONTEND
        var group = req.body;

        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(group._id);

        // OBLIGATOIRE DE SUPPRIMER _ID DE OBJET USER SINON LE UPDATE NE PASSE PAS SUR MONGODB (CONFLIT)
        delete group._id;

        try {
            db.collection("groups").replaceOne({ _id: idObj }, group);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(400);
            console.log(e);
        }
    });

    app.post("/deleteGroup", permissions.requiresLoggedIn,permissions.permission_valid("DELETE_GROUP"), function(req, res) {
       

        // CONTROLE DE LA PERMISSION
        if (!permissions.permission_valid("DELETE_GROUP", req)) {
            console.log(" NO RIGHTS");
            res.status(403).send({ errorCode: "403" });
            return;
        }

        var group = req.body;
        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(group._id);

        try {
            db.collection("groups").deleteOne({ _id: idObj });
            console.log("Deleted one group");
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });

    app.post("/readGroups", function(req, res) {
        db.collection("groups")
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

    app.get("/readGroupsCount", function(req, res) {
        db.collection("groups")
            .countDocuments()
            .then(count => {
                res.send({ result: count });
            });
    });
};
