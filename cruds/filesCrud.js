// ----------------------------------- UPLOADING IMAGES AND FILES-------------------------------------------

module.exports = function(app, db, permissions) {

/* ************************************* NODE MODULES ****************************************************** */

var cloudinary    = require('cloudinary'); // Managing the cloudinary server pictures storing
var Client        = require('ssh2-sftp-client'); // Managing the SFTP server connexion
var multer        = require("multer"); // Managing multiples files uploads
const sharp       = require("sharp"); // Resizing pictures module 
var fs            = require("fs"); // Managing the file system
const bodyParser  = require("body-parser");


/* ************************************* CONFIGS ****************************************************** */


/* 
          CLOUDINARY 
          'STORING PICTURES ON THE CLOUD' 
*/

cloudinary.config({ 
  cloud_name: 'ddq5asuy2', 
  api_key: '354237299578646', 
  api_secret: '3UWkrND91MW3jhmGecvp77uetvQ' 
});


/* 
          FTP SERVERS CONNEXIONS
          'STORING FILES AND PICTURES ON THE CLOUD'  

*/


// 1. NODE MODULE : FTP
/*  var Client = require('ftp');
 let config = {
  host: "ftpupload.net",
  user: "epiz_25107181",
  password: "uk7HxjN7vmR1",
  port: 21
};
  var c = new Client();
  c.on('ready', function() {
    c.list(function(err, list) {
      if (err) throw err;
      console.dir(list);
      c.end();
    });
  });

  c.connect(config); */

// 2. NODE MODULE : SFTP : ssh2-sftp-client

let sftp = new Client();

sftp.connect({
   host: "test.rebex.net",
    user: "demo",
    password: "password",
    port:22
}).then(() => {
  return sftp.list('/');
}).then(data => {
  console.log(data, 'the data info');
}).catch(err => {
  console.log(err, 'catch error');
});


// 3. NODE MODULE : multer-ftp NOT WORKING
 /*    var FTPStorage = require('multer-ftp')

    var  storage = new FTPStorage({
        basepath: '/htdocs/files',
        ftp: {
            host: "ftpupload.net",
            user: "epiz_25107181",
            password: "xxxxxxx",
            secure: false
        }
    }) */
// end multer-ftp


// 4. NODE MODULE : multer-sftp NOT WORKING

/* var sftpStorage = require('multer-sftp')
 
var storage = sftpStorage({
  sftp: {
     host: "test.rebex.net",
    user: "demo",
    password: "password",
    port:22
  },
  destination: function (req, file, cb) {
    cb(null, '/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
}) */



 /* ************************************* FILE HANDLINGS ****************************************************** */  

    var storageImages = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./uploads/img");
        },
        filename: function(req, file, cb) {
            let ext = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length);
            let myUniqueFileName = file.originalname + "-" + Date.now() + ext ;
            cb(null,myUniqueFileName);
            
          
        }
    });

    var storageFiles = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./uploads/files");
        },
        filename: function(req, file, cb) {
            let ext = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length);
            cb(null, file.originalname + "-" + Date.now() + ext);
        }
    });


    var uploadFiles = multer({ storage: storageFiles });

    var uploadImages = multer({ storage: storageImages });


    // ******************************************************** CRUD ****************************************************** */  

    app.post("/images", uploadImages.single("file"), function(req, res, next) {
        console.log(req.file);
        
        // STEP 1 : reducing picture size
        sharp(req.file.path) 
            .resize(200, 200)
            .toBuffer(function(err, buffer) {
                fs.writeFile(req.file.path, buffer, function(e) {});
            });

          // STEP 2 : CLOUDINARY STORING
          // ALSO STORING THE PICTURE ON CLOUDINARY https://support.cloudinary.com/hc/en-us/articles/202520762-How-to-upload-images-while-keeping-their-original-filenames-
            // {"use_filename": true, "unique_filename": false}, NOT WORKING 
          cloudinary.uploader.upload("./uploads/img/"+ req.file.filename,
            function(result) { 
              console.log('moncloudinary')
              console.log(result.url) ;
              // SENDING THE CLOUDINARY URL FOR FRONT END DISPLAYING
              res.send({ filename: result.url});
            })
            // SENDING THE UPLOADS URL FOR DISPLAYING
              // res.send({ filename: req.file.filename});
    
        // res.sendStatus(200);
    });

    app.post("/createFiles", uploadFiles.array("file", 10), function(req, res, err) {
        if (err) {
            console.log(err);
        }
        var filenames = [];
        req.files.forEach(function(file) {
            console.log(file);
            filenames.push(file);
        });
        res.send(filenames);
    });

    app.post("/deleteFile", function(req, res) {
        // LOGGED IN CONTROL
        if (!req.session.loggedIn) {
            console.log(" FORBIDDEN ");
            res.status(403).send({ errorCode: "403" });
            return;
        }

        // CONTROLE DE LA PERMISSION
        if (!permissions.permission_valid("DELETE_FILE", req)) {
            console.log(" NO RIGHTS");
            res.status(403).send({ errorCode: "403" });
            return;
        }
        console.log(req.body);
        var file = req.body.name;

        try {
            var fs = require("fs");
            var filePath = "./uploads/files/" + file;
            fs.unlinkSync(filePath);

            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }

        // -------------------------------------------------------- END CRUD 
    });
    // ----------------------------------- END UPLOADING IMAGES AND FILES -----------------------------------
};
