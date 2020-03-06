// ----------------------------------- UPLOADING IMAGES AND FILES-------------------------------------------
module.exports = function(app, db, permissions) {
  var multer = require("multer");
  // §§resize
  const sharp = require("sharp");
  var fs = require("fs");

  const bodyParser = require("body-parser");

  var storageImages = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/img");
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname + "-" + Date.now() + ".jpg");
    }
  });

  var storageFiles = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/files");
    },
    filename: function(req, file, cb) {
      let ext = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );
      cb(null, file.originalname + "-" + Date.now() + ext);
    }
  });

  var uploadFiles = multer({ storage: storageFiles });
  var uploadImages = multer({ storage: storageImages });

  app.post("/images", uploadImages.single("file"), function(req, res, next) {
    console.log(req.file);

    sharp(req.file.path)
      .resize(200, 200)
      .toBuffer(function(err, buffer) {
        fs.writeFile(req.file.path, buffer, function(e) {});
      });
    res.send({ filename: req.file.filename });
    // res.sendStatus(200);
  });

  app.post("/files", uploadFiles.array("file", 10), function(req, res, err) {
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
  });
  // ----------------------------------- END UPLOADING IMAGES AND FILES -----------------------------------
};
