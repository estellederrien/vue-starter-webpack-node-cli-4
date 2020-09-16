// ----------------------------------- MONGODB AUTH USER  -------------------------------------------
module.exports = function(app, db, session, bcrypt) {
  /*
   * Auth a user on MONGODB ATLAS
   * @params JSON OBJECT
   * @return Status 200
   * @error  Status 400
   */

  app.post("/getAuth", function(req, res) {
    // step 1. Getting front end DATA (email and password) - On récupère log in et mot de passe du front end
    var user = req.body;

    // step 2. FINDING EMAIL IN DATABASE - ON cherche l'email dans la db
    db.collection("users").findOne({ email: user.email }, function(findErr,result) {
      
      if (findErr) res.status(403).send({ errorCode: "403" });

      if (!result) {
        console.log("USER not present in the DATABASE");
        res.status(403).send({ errorCode: "403" });
      } else {
        
        // step 3. sCOMPARING PASSWORDS  - ON compare le password entré et celui de la database
        if (bcrypt.compareSync(user.password, result.password)) {  // Passwords match
        
          // USER ALREADY HAS A BACK END SESSION ID
          console.log("reqsessionId ; " + req.sessionID);

          // step 4. BUILDING THE BACKEND USER SESSION - AJOUT DES DATAS DU USER A LA SESSION ET LE FAIT QUIL EST LOGGE
          req.session.loggedIn = true;
          req.session.user = result;

          // step 5. SENDING USER DATA TO FRONT END ENVOI DU USER AU FRONT END
          res.send(result);

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
   * @return
   * @error  
   */

  app.post("/logout", function(req, res) {
    req.session.loggedIn = false;
    console.log("NOT LOGGED ANY MORE");
    res.sendStatus(200);
  });

  // -----------------------------------FIN AUTH USER-------------------------------------------
};
