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
    
    const ftp       = require("basic-ftp") // ftp connexion
    var Client      = require("ssh2-sftp-client") // Managing the SFTP server connexion
    var multer      = require("multer") // Managing multiples files uploads
    var fs          = require("fs") // Managing the file system
    const bodyParser = require("body-parser")


    /* ************************************* PARAMS    ****************************************************** */

    // NODE SERVER FILE PATH - CHEMIN DE STOCKAGE DES FICHERS SUR LE SERVER NODE
    const path = "./tmp/files"
    
    /* FTP SERVER PARAMS - YOU HAVE TO OWN A FTP SERVER * https://www.npmjs.com/package/basic-ftp*/
   const config =  {
            host: "ftpupload.net",
            user: "epiz_26763901",
            password: "8I3OWcTxB53UG",
            secure: false
        }
 


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
    

    /* ************************************* NODE.JS SERVER MULTER FILE HANDLINGS ****************************************************** */

    // If we store our files on our node.js server, then we have to use MULTER . - Si on stocke nos fichiers sur le server node, alors, il faut utiliser MULTER
    var storageFiles = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path) // Path to store our files . Le chemin ou on enregistre nos fichiers.
        },
        filename: function(req, file, cb) {
            let ext = file.originalname.substring(
                file.originalname.lastIndexOf("."),
                file.originalname.length,
            )
            cb(null, file.originalname + "-" + Date.now() + ext) // A date will guarantee our filename to be unique. , Ajouter la date gaurantit l'unicité du fichier, aucun doublon possible  
        },
    })

    var uploadFiles = multer({ storage: storageFiles })

    // ********************************** CRUD - STORING FILES ON THE NODE SERVER WEB SERVICES   - CRUD - STOCKE LES FICHIERS SUR LE SERVEUR NODE ****************************************************** */

   /*
   * Create multiples files on the node server - Créer des fichiers multiples en provenance du front end .
   * @params Multiples files received from the front end  - In the FormData() format -  headers: {crossdomain: true,"Content-Type": "undefined"}
   * @return ARRAY - Filenames
   * @error   STATUS 400
   */
    app.post("/createFiles", permissions.requiresLoggedIn, permissions.permission_valid("CREATE_FILE"), uploadFiles.array("file", 10), function(req, res, err) {
        if (err) {
            console.log(err)
            //res.sendStatus(400)
        }
        // Getting the Multer modified filenames, then send them back to the front end - ON récupère les noms des fichiers qui ont été modifiés par multer, puis on les renvoit au front end .
        var filenames = []

        req.files.forEach(function(file) {
            filenames.push(file)
        })
        res.send(filenames)
    })

   /*
   * Update a file on the node server - Mettre à jour un fichier sur le serveur node
   * @params TODO
   * @return  TODO
   * @error   TODO
   */
    app.post("/updateFile", function(req, res, next) {
        // TO DO
    })

   /*
   * Delete a file FROM the node server - Supprimer un fichier sur le serveur node.
   * @params JSON OBJECT - EXAMPLE : {'NAME':'myfilename'}
   * @return  STATUS 200 
   * @error   STATUS 400
   */
    app.post("/deleteFile",
        permissions.permission_valid("DELETE_FILE"),
        function(req, res) {

            var file = req.body.name

            try {
                var fs = require("fs")
                var filePath = path + file
                fs.unlinkSync(filePath)
                res.sendStatus(200)
            } catch (e) {
                console.log(e)
                res.sendStatus(400)
            }
        },
    )

    // ******************************************************** FTP FILES STORING CRUD WEB SERVICES ****************************************************** */



    // CREATE A FILE  ON FTP WEB SERVICE IN DEV
    app.post("/createFtpFiles", function(req, res, next) {
        example()
 
        async function example() {
        const client = new ftp.Client()
        client.ftp.verbose = true
        try {
            await client.access(config)
            console.log(await client.list())
            await client.ensureDir("htdocs/")
            await client.clearWorkingDir()
            await client.uploadFromDir("tmp/files")
            // await client.uploadFrom("README.md", "README_FTP.md")
            // await client.downloadTo("README_COPY.md", "README_FTP.md")
        }
        catch(err) {
            console.log(err)
        }
        client.close()
        // TO DO
        }
    })

    // READ A FILE ON FTP WEB SERVICE
    app.post("/readFtpFile", function(req, res, next) {
        // TO DO
    })

    // UPDATE A FILE  ON FTP WEB SERVICE
    app.post("/updateFtpFile", function(req, res, next) {
        // TO DO
    })

    // DELETE A FILE ON FTP WEB SERVICE
    app.post("/deleteFtpFile", function(req, res, next) {
        // TO DO
    })

 // TRANSFERING ALL FILES TO FTP 
 app.post("/transferFtpFiles", function(req, res, next) {
    
    example()
 
    async function example() {
        const client = new ftp.Client()
        client.ftp.verbose = true
        try {
            await client.access(config)
            console.log(await client.list())
            await client.ensureDir("htdocs/")
            await client.clearWorkingDir()
            await client.uploadFromDir("tmp/files")
            // await client.uploadFrom("README.md", "README_FTP.md")
            // await client.downloadTo("README_COPY.md", "README_FTP.md")
        }
        catch(err) {
            console.log(err)
        }
        client.close()
    }
})

    // ******************************************************** CLOUD FILES CRUD STORING WEB SERVICES ****************************************************** */

    // CREATE A FILE ON THE CLOUD SERVER
    app.post("/createCloudFile", function(req, res, next) {
        // TO DO
        // SENDING THE UPLOADS URL FOR DISPLAYING
        // res.send({ filename: req.file.filename});
    })

    // READ A FILE  ON THE Cloud SERVER
    app.post("/readCloudFile", function(req, res, next) {
        // TO DO
    })

    // UPDATE A FILE  ON THE Cloud SERVER
    app.post("/updateCloudFile", function(req, res, next) {
        // TO DO
    })

    // DELETE A FILE ON THE Cloud SERVER
    app.post("/deleteCloudFile", function(req, res, next) {
        // TO DO
    })










    // ----------------------------------- END UPLOADING FileS AND FILES -----------------------------------
}