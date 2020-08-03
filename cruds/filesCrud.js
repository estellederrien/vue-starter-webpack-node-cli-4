// ----------------------------------- UPLOADING FILES-------------------------------------------

/* INTRODUCTION 

  THERE ARE 3 WAYS TO STORE  FILES :
  1. CLOUDINARY SERVER 
  2. THE NODE SERVER
  3. AN FTP SERVER .

  AS LONGAS YOU CHOOSE AN OPTION, YOU HAVE TO CHANGE SEVERAL THINGS IN THE FRONT END VUE.JS APP TOO !
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

	/*  CLOUDINARY PARAMS 'STORING PICTURES ON THE CLOUD' YOU HAVE TO OWN A CLOUDINARY ACCOUNT */

	cloudinary.config({
		cloud_name: "ddq5asuy2",
		api_key: "354237299578646",
		api_secret: "3UWkrND91MW3jhmGecvp77uetvQ",
	})

	/* 
  FTP SERVER PARAMS 'STORING FILES AND PICTURES ON MY PERSONNAL FTP'  YOU HAVE TO OWN A FTP SERVER
*/
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
			cb(null, "./uploads/files")
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

	// ******************************************************** BACK END CRUD NODE SERVER FILES WEB SERVICE ****************************************************** */

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

	// READ A FILE ON FTP
	app.post("/readFile", function(req, res, next) {
		// TO DO
	})

	// UPDATE A FILE ON FTP
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
				var filePath = "./uploads/files/" + file
				fs.unlinkSync(filePath)

				res.sendStatus(200)
			} catch (e) {
				console.log(e)
				res.sendStatus(400)
			}
		},
	)

	// ----------------------------------- END UPLOADING IMAGES AND FILES -----------------------------------
}
