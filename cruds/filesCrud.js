// ----------------------------------- UPLOADING FILES-------------------------------------------

/* INTRODUCTION 

  THERE ARE 3 WAYS TO STORE  FILES :
  1. THE NODE SERVER
  2. AN FTP SERVER 
  3. SOMEWHERE ON THE CLOUD

  AS LONG AS YOU CHOOSE AN OPTION, YOU HAVE TO CHANGE SEVERAL THINGS IN THE FRONT END VUE.JS APP TOO !
  IM CURRENTLY BUILDING THIS TRYING TO MAKE IT THE SIMPLIER AS POSSIBLE  !

*/

module.exports = function(app, db, permissions) {
    /* ************************************* NODE MODULES ****************************************************** */

    var cloudinary = require("cloudinary") // Managing the cloudinary server pictures storing
    var Client = require("ssh2-sftp-client") // Managing the SFTP server connexion
    var multer = require("multer") // Managing multiples files uploads
    const sharp = require("sharp") // Resizing pictures module
    var fs = require("fs") // Managing the file system
    const bodyParser = require("body-parser")

    /* ************************************* STORAGE SERVERS CONNEXIONS PARAMS ****************************************************** */

    /* FTP SERVER PARAMS 'STORING FILES AND PICTURES ON MY PERSONAL FTP'  YOU HAVE TO OWN A FTP SERVER*/
    let sftp = new Client()

    sftp.connect({
            host: "test.rebex.net",
            user: "demo",
            password: "password",
            port: 22,
        })
        .then(() => {
            return sftp.list("/")
        })
        .then((data) => {
            console.log(data, "the data info")
        })
        .catch((err) => {
            console.log(err, "catch error")
        })

    /* ************************************* MULTER FILE HANDLINGS ****************************************************** */

    // MULTER PARAMS FOR FILES STORAGE
    var storageFiles = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./tmp/files")
        },
        filename: function(req, file, cb) {
            let ext = file.originalname.substring(
                file.originalname.lastIndexOf("."),
                file.originalname.length,
            )
            cb(null, file.originalname + "-" + Date.now() + ext)
        },
    })

    var uploadFiles = multer({ storage: storageFiles })

    // ********************************** CRUD - STORING FILES ON THE NODE SERVER WEB SERVICES (Bad practise)****************************************************** */
    // ********************************** CRUD - STOCKE LES FICHIERS SUR LE SERVEUR NODE  ****************************************************** */

    // CREATE MULTIPLE FILES
    app.post("/createFiles", uploadFiles.array("file", 10), function(req, res, err) {
        if (err) {
            console.log(err)
        }
        var filenames = []
        req.files.forEach(function(file) {
            console.log(file)
            filenames.push(file)
        })
        res.send(filenames)
    })

    // READ A FILE ON THE NODE SERVER
    app.post("/updateFile", function(req, res, next) {
        // TO DO
    })

    // DELETE A FILE
    app.post("/deleteFile",
        permissions.requiresLoggedIn,
        permissions.permission_valid("DELETE_FILE"),
        function(req, res) {
            console.log(req.body)
            var file = req.body.name

            try {
                var fs = require("fs")
                var filePath = "./tmp/files/" + file
                fs.unlinkSync(filePath)

                res.sendStatus(200)
            } catch (e) {
                console.log(e)
                res.sendStatus(400)
            }
        },
    )

    // ******************************************************** BACK END CRUD FTP FILES STORING WEB SERVICES ****************************************************** */



    // CREATE A File ON FTP WEB SERVICE
    app.post("/createFtpFile", function(req, res, next) {
        // TO DO
    })

    // READ A PICTURE ON FTP WEB SERVICE
    app.post("/readFtpFile", function(req, res, next) {
        // TO DO
    })

    // UPDATE A PICTURE ON FTP WEB SERVICE
    app.post("/updateFtpFile", function(req, res, next) {
        // TO DO
    })

    // DELETE A PICTURE ON FTP WEB SERVICE
    app.post("/deleteFtpFile", function(req, res, next) {
        // TO DO
    })

    // ******************************************************** BACK END CLOUD FILES STORING WEB SERVICES ****************************************************** */

    // CREATE A PICTURE ON THE CLOUD SERVER
    app.post("/createCloudFile", function(req, res, next) {
        // TO DO
        // SENDING THE UPLOADS URL FOR DISPLAYING
        // res.send({ filename: req.file.filename});
    })

    // READ A PICTURE ON THE Cloud SERVER
    app.post("/readCloudFile", function(req, res, next) {
        // TO DO
    })

    // UPDATE A PICTURE ON THE Cloud SERVER
    app.post("/updateCloudFile", function(req, res, next) {
        // TO DO
    })

    // DELETE A PICTURE ON THE Cloud SERVER
    app.post("/deleteCloudFile", function(req, res, next) {
        // TO DO
    })










    // ----------------------------------- END UPLOADING FileS AND FILES -----------------------------------
}