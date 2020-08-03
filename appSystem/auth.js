// ----------------------------------- MONGODB AUTH USER  -------------------------------------------
module.exports = function(app, db, session, bcrypt) {
  app.post("/getAuth", function(req, res) {
    console.log(req.body);
    console.log(req.sessionID);
    // RECHERCHE DU USER SUR MONGODB
    var identifier = req.body;

    db.collection("users").findOne({ email: identifier.email }, function(
      findErr,
      result
    ) {
      if (findErr) res.status(403).send({ errorCode: "403" });

      if (!result) {
        res.status(403).send({ errorCode: "403" });
      } else {
        if (bcrypt.compareSync(identifier.password, result.password)) {
          // Passwords match

          console.log("reqsessionId ; " + req.sessionID);

          // AJOUT DES DATAS DU USER A LA SESSION ET LE FAIT QUIL EST LOGGE
          req.session.loggedIn = true;
          req.session.user = result;

          // ENVOI DU USER AU FRONT END
          res.send(result);
        } else {
          // Passwords don't match
          console.log("Passwords don't match");
          res.status(403).send({ errorCode: "403" });
        }
      }
    });
  });

  // Permet de savoir si la session est anonyme ou quelqu'un de loggé ,
  // au cas l'utilisateur clique sur F5 , on relit cette fonction, puis on dit si cest un anonyme ou pas.
  // ca sert aussi quand on update quelque chose dans le frontend, pour rafraichir le user
  app.post("/getActualSession", function(req, res) {
    if (req.session.loggedIn) {
      console.log("User has logged in");

      // res.send(req.session.user);
      var identifiantMongoDb = req.session.user._id;

      var ObjectId = require("mongodb").ObjectID; //working
      var idObj = ObjectId(identifiantMongoDb); //working

      db.collection("users").findOne({ _id: idObj }, function(findErr, result) {
        if (findErr) throw findErr;
        res.send(result);
      });
    } else {
      console.log("Anonymous user");
      res.status(403).send({ errorCode: "403" });
    }
  });

  app.post("/logout", function(req, res) {
    req.session.loggedIn = false;
    console.log("NOT LOGGED ANY MORE");
    res.sendStatus(200);
  });

  function requiresAuth (req, res, next) {
    // LOGGED IN CONTROL
    if (!req.session.loggedIn) {
        console.log(" FORBIDDEN ");
        res.status(403).send({ errorCode: "403" });
        return;
    }
    else {
        next(); // continue the process
    }
  }

  // -----------------------------------FIN AUTH USER-------------------------------------------
};
