// ----------------------------------- AUTHENTICATE USER  -------------------------------------------
module.exports = function(app, db, session, bcrypt) {
  /*
   * Authenticate a MONGODB ATLAS user  - Authentifier un utilisateur sur Mongodb ATLAS
   * @params JSON OBJECT - EXAMPLE : {"email":"urEmail","password":"urPassword"}
   * @return JSON OBJECT - dbUser
   * @error  Status 403
   */

  app.post("/getAuth", function(req, res) {
    // AN ANONYMOUS USER ALREADY HAS A BACK END SESSION ID, WE LOOK AT IT - Un utilisateur anonyme possède déjà un id de session , gràce au module node session
    console.log("reqsessionId ; " + req.sessionID);

    // step 1. Getting front end DATA (email and password) - On récupère log in et mot de passe du front end
    var frontEndUser = req.body;

    // step 2. FINDING EMAIL IN DATABASE - ON cherche l'email dans la db
    db.collection("users").findOne({ email: frontEndUser.email }, function(findErr,dbUser) {
      
      if (findErr) res.status(403).send({ errorCode: "403" });

      if (!dbUser) {
        console.log("USER is not present in the DATABASE");
        res.status(403).send({ errorCode: "403" });
      } else {
        // step 3. COMPARING PASSWORDS ( front end vs db ) - ON compare le password entré et celui de la database
        if (bcrypt.compareSync(frontEndUser.password, dbUser.password)) { // Passwords match
         

          // step 4. BUILDING THE BACKEND USER SESSION - AJOUT DES DATAS DU USER A LA SESSION ET LE FAIT QUIL EST LOGGE
          req.session.loggedIn = true;
          req.session.user = dbUser;

          // step 5. SENDING USER DATA TO FRONT END ENVOI DU USER AU FRONT END
          res.send(dbUser);

        } else {
          //
          // step 6 : Passwords don't match  Erreur de mot de passe
          console.log("Passwords don't match");
          res.status(403).send({ errorCode: "403" });
        }
      }
    });
  });

  /*
   * Loggin out an APP user  - Delogge un utilisateur
   * @params NONE
   * @return 200
   * @error NONE
   */

  app.post("/logout", function(req, res) {
    req.session.loggedIn = false;
    console.log("NOT LOGGED ANY MORE");
    res.sendStatus(200);
  });

  // -----------------------------------FIN AUTH USER-------------------------------------------
};
