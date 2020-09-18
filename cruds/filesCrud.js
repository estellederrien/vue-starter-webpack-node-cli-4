// ----------------------------------- UPLOADING FILES-------------------------------------------

/* INTRODUCTION 

  THERE ARE 3 WAYS TO STORE  FILES :
  1. ON THE NODE SERVER ( THE TMP DIRECTORY IS MANDATORY ON HEROKU)
  2. AN FTP SERVER 
  3. SOMEWHERE ON THE CLOUD

  AS LONG AS YOU CHOOSE AN OPTION, YOU HAVE TO CHANGE SEVERAL THINGS IN THE FRONT END VUE.JS APP TOO !
  IM CURRENTLY BUILDING THIS TRYING TO MAKE IT THE SIMPLIER AS POSSIBLE  !

  INTRODUCTION
  IL Y A 3 FAÇONS DE STOCKER DES FICHIERS:
  1. SUR LE SERVEUR NODE ( OBLIGATOIREMENT DANS LE REPERTOIRE TMP SUR HEROKU )
  2. UN SERVEUR FTP
  3. PARTOUT SUR LE CLOUD
  TANT QUE VOUS CHOISISSEZ UNE OPTION, VOUS DEVEZ CHANGER PLUSIEURS CHOSES DANS L'APPLICATION VUE.JS AVANT!
  JE CONSTRUIS ACTUELLEMENT ET ESSAYE DE LE RENDRE LE PLUS SIMPLE POSSIBLE!

*/

module.exports = function(app, db, permissions) {


  /* ************************************* LOADING NODE MODULES ****************************************************** */

  const ftp = require("basic-ftp"); // ftp connexion
  const Client = require("ssh2-sftp-client"); // Managing the SFTP server connexion
  const multer = require("multer"); // Managing multiples files uploads
  const fs = require("fs"); // Managing the file system
  const bodyParser = require("body-parser");



  /* ************************************* PARAMS    ****************************************************** */

  // NODE SERVER FILE PATH - CHEMIN DE STOCKAGE DES FICHERS SUR LE SERVER NODE
  const path = "./tmp/files/";

  /* FTP SERVER PARAMS - YOU HAVE TO OWN A FTP SERVER * https://www.npmjs.com/package/basic-ftp*/
  const config = {
    host: "ftpupload.net",
    user: "epiz_26763901",
    password: "8I3OWcTxB53UG",
    secure: false,
  };

  /* SFTP SERVER PARAMS 'STORING FILES AND PICTURES ON MY PERSONAL FTP' */
  /*     let sftp = new Client()

    
        sftp.connect(config)
            .then(() => {
                return sftp.list("/htdocs")
            })
            .then((data) => {
                console.log(data, "the data info")
            })
            .catch((err) => {
                console.log(err, "catch error")
            })
    */

  /* ************************************* MULTER MULTIPLE FILES UPLOADS FILE HANDLINGS ****************************************************** */

  // If we permit multiples uploads  then we have to use MULTER to add a date to each of the filenames, avoiding any duplicate .
  // - Si on fait de l'upload de fichiers multiples, on utilise multer pour renommer les fichiers et les rendre uniques en y ajoutant la date
  var storageFiles = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path); // Path to store our files . Le chemin ou on enregistre nos fichiers.
    },
    filename: function(req, file, cb) {
      let extension = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length);
      let filename = file.originalname
        .split(".")
        .slice(0, -1)
        .join(".");
      cb(null, filename + "-" + Date.now() + extension); // A date will guarantee our filename to be unique. , Ajouter la date gaurantit l'unicité du fichier, aucun doublon possible
    },
  });

  var uploadFiles = multer({ storage: storageFiles });




  // ********************************** CRUD - STORING FILES ON THE NODE SERVER WEB SERVICES   - CRUD - STOCKE LES FICHIERS SUR LE SERVEUR NODE ****************************************************** */

  /*
   * Create multiples files on the node server - Créer des fichiers multiples en provenance du front end .
   * @params Multiples files received from the front end  - In the FormData() format -  headers: {crossdomain: true,"Content-Type": "multipart/form-data"}
   * @return ARRAY - Filenames
   * @error   STATUS 400
   */
  app.post("/createFiles", permissions.requiresLoggedIn, permissions.permission_valid("CREATE_FILE"), uploadFiles.array("file", 10), function(req, res, err) {
    
    // Init variables
    var filenames = [];

    if (err) {
      console.log(err);
      //res.sendStatus(400)
    }
    // Getting the Multer modified filenames, then send them back to the front end - 
    // On récupère les noms des fichiers qui ont été modifiés par multer, puis on les renvoit au front end .
    
    req.files.forEach(function(file) {
      filenames.push(file);
    });
    
    // Sending back filenames to the VUE.js front end for later displaying and db recording ...
    res.send(filenames);

  });

  /*
   * Update a file on the node server - Mettre à jour un fichier sur le serveur node
   * @params TODO
   * @return  TODO
   * @error   TODO
   */
  app.post("/updateFile", function(req, res, next) {
    // TO DO
  });

  /*
   * Delete a file FROM the node server - Supprimer un fichier sur le serveur node.
   * @params JSON OBJECT - EXAMPLE : {'NAME':'myfilename'}
   * @return  STATUS 200
   * @error   STATUS 400
   */
  app.post("/deleteFile", permissions.permission_valid("DELETE_FILE"), function(req, res) {
    var file = req.body.name;

    try {
      var fs = require("fs");
      var filePath = path + file;
      fs.unlinkSync(filePath);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });




  // ******************************************************** CRUD -  FTP FILES STORING CRUD WEB SERVICES ****************************************************** */

   /*
   * Create multiples files on the FTP server - Créer des fichiers multiples en provenance du front end .
   * @params Multiples files received from the front end  - In the FormData() format -  headers: {crossdomain: true,"Content-Type": "multipart/form-data"}
   * @return ARRAY - Filenames
   * @error   NONE
   */
  app.post("/createFtpFiles", uploadFiles.array("file", 10), function(req, res, next) {

    
    send_my_files_to_the_ftp();

    async function send_my_files_to_the_ftp() {
      const client = new ftp.Client();
      client.ftp.verbose = true;
      try {

        //Init variables 
        var filenames = [];

        await client.access(config);
        await client.ensureDir("htdocs/");

        // DEBUG await client.uploadFrom("tmp/files/README.md.txt", "README_FTP.md")

        // Getting all files  then sending them one by one ASYNC to  the ftp server - 
        // On prends chaque fichier et on les envoie sur le ftp un par un dans une boucle for avec un async, je sais cest bizarre mais ça marche
        for (var x = 0; x < req.files.length; x++) {
          await client.uploadFrom("tmp/files/" + req.files[x].filename, req.files[x].filename);
        }

        // Getting the Multer modified filenames, then send them back to the front end - 
        // ON récupère les noms des fichiers qui ont été modifiés par multer, puis on les renvoit au front end .
      
        req.files.forEach(function(file) {
          filenames.push(file);
        });

        // Sending back filenames to the VUE.js front end for later displaying and db recording ...
        res.send(filenames);

      } catch (err) {
        console.log(err);
      }
      client.close();
    }
  });

    /*
   * Read an FTP file - Lire un fichier sur le server FTP
   * Downloading the file , transfering it to the tmp directory, so the front end can read it
   * @params  JSON {name: file.filename}
   * @return  STATUS 200
   * @error   STATUS 400
   */
  app.post("/readFtpFile", function(req, res, next) {
    
    // Init variables 
    var file = req.body.name;
    console.log(file );

    read_my_ftp_file(file);

    async function read_my_ftp_file(file) {
      const client = new ftp.Client();
      client.ftp.verbose = true;
      try {
        await client.access(config);
        await client.ensureDir("htdocs/");
        await client.downloadTo("tmp/files/"+file,file )
        res.sendStatus(200);

      } catch (err) {
        console.log(err);
        res.sendStatus(400);
      }
     client.close();
    }
  });

  // UPDATE A FILE  ON FTP WEB SERVICE
  app.post("/updateFtpFile", function(req, res, next) {
    // TO DO
  });

    /*
   * DELETE an FTP file - supprimer un fichier sur le server FTP
   *
   * @params  JSON {name: file.filename}
   * @return  STATUS 200
   * @error   STATUS 400
   */
  app.post("/deleteFtpFile", function(req, res, next) {
     // Init variables 
     var file = req.body.name;
     console.log(file );
 
     delete_my_ftp_file(file);
 
     async function delete_my_ftp_file(file) {
       const client = new ftp.Client();
       client.ftp.verbose = true;
       try {
         await client.access(config);
         await client.ensureDir("htdocs/");
         await client.remove(file)
         res.sendStatus(200);
 
       } catch (err) {
         console.log(err);
         res.sendStatus(400);
       }
      client.close();
     }
  });


  /*
   * TRANSFERING ALL OF THE NODE SERVER FILES TO AN FTP - TRANSFERER TOUS LES FICHIERS DU SERVEUR NODE SUR NOTRE SERVEUR FTP
   * @params Multiples files received from the front end  - In the FormData() format -  headers: {crossdomain: true,"Content-Type": "multipart/form-data"}
   * @return ARRAY - Filenames
   * @error   NONE
   */
  app.post("/transferFtpFiles", function(req, res, next) {
    example();

    async function example() {
      const client = new ftp.Client();
      client.ftp.verbose = true;
      try {
        await client.access(config);
        console.log(await client.list());
        await client.ensureDir("htdocs/");
        await client.clearWorkingDir();
        await client.uploadFromDir("tmp/files");
        // DEBUG await client.uploadFrom("README.md", "README_FTP.md")
        // DEBUG await client.downloadTo("README_COPY.md", "README_FTP.md")
      } catch (err) {
        console.log(err);
      }
      client.close();
    }
  });




  // ******************************************************** CRUD -  CLOUD FILES CRUD STORING WEB SERVICES ****************************************************** */

  // CREATE A FILE ON THE CLOUD SERVER
  app.post("/createCloudFile", function(req, res, next) {
    // TO DO
    // SENDING THE UPLOADS URL FOR DISPLAYING
    // res.send({ filename: req.file.filename});
  });

  // READ A FILE  ON THE Cloud SERVER
  app.post("/readCloudFile", function(req, res, next) {
    // TO DO
  });

  // UPDATE A FILE  ON THE Cloud SERVER
  app.post("/updateCloudFile", function(req, res, next) {
    // TO DO
  });

  // DELETE A FILE ON THE Cloud SERVER
  app.post("/deleteCloudFile", function(req, res, next) {
    // TO DO
  });

  // ----------------------------------- END UPLOADING FileS AND FILES -----------------------------------
};
