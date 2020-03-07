// ---------------------------------- JOBS CRUD -------------------------------------------
module.exports = function(app, db, permissions) {
    app.post("/createJob", function(req, res) {
        var job = req.body;

        job.creation_date = new Date();

        if (!permissions.permission_valid("CREATE_JOB", req)) {
            console.log(" NO RIGHTS");
            res.status(403).send({ errorCode: "403" });
            return;
        }

        // CONTROLE DE DOUBLONS JOBS

        db.collection("jobs").findOne({ name: job.name }, function(findErr, result) {
            if (!result) {
                execute();
            } else {
                res.status(403).send({ errorCode: "403" });
                return;
            }
        });

        function execute() {
            try {
                db.collection("jobs").insertOne(job);
                console.log("added on job");
                res.sendStatus(200);
            } catch (e) {
                console.log(e);
                res.sendStatus(400);
            }
        }
    });

    app.post("/readJob", function(req, res) {
        var identifiant = req.param("id");
        var ObjectId = require("mongodb").ObjectID; //working
        var idObj = ObjectId(identifiant); //working

        db.collection("jobs").findOne({ _id: idObj }, function(findErr, result) {
            if (findErr) throw findErr;
            res.send(result);
        });
    });

    app.post("/updateJob", function(req, res) {
        // LOGGED IN CONTROL
        if (!req.session.loggedIn) {
            console.log(" FORBIDDEN ");
            res.status(403).send({ errorCode: "403" });
            return;
        }

        if (!permissions.permission_valid("UPDATE_JOB", req)) {
            console.log(" NO RIGHTS");
            res.status(403).send({ errorCode: "403" });
            return;
        }

        // GETTIN DATA FROM FRONTEND
        var job = req.body;

        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(user._id);

        // OBLIGATOIRE DE SUPPRIMER _ID DE OBJET USER SINON LE UPDATE NE PASSE PAS SUR MONGODB (CONFLIT)
        delete job._id;

        try {
            db.collection("jobs").replaceOne({ _id: idObj }, user);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(400);
            console.log(e);
        }
    });

    app.post("/deleteJob", function(req, res) {
        // LOGGED IN CONTROL
        if (!req.session.loggedIn) {
            console.log(" FORBIDDEN ");
            res.status(403).send({ errorCode: "403" });
            return;
        }

        // CONTROLE DE LA PERMISSION
        if (!permissions.permission_valid("DELETE_JOB", req)) {
            console.log(" NO RIGHTS");
            res.status(403).send({ errorCode: "403" });
            return;
        }

        var user = req.body;
        var ObjectId = require("mongodb").ObjectID;
        var idObj = ObjectId(user._id);

        try {
            db.collection("users").deleteOne({ _id: idObj });
            console.log("supprimé un user");
            // Delete session
            delete req.session;
            // delete_user_from_all(user);

            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    });

    app.post("/readJobs", function(req, res) {
        db.collection("jobs")
            .find()
            .sort({ name: 1 })
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(err);
                res.send(docs);
            });
    });

    app.post("/readJobsForFilters", function(req, res) {
        db.collection("jobs")
            .find()
            .sort({ name: 1 })
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(err);

                var jobs = docs.map(function(item) {
                    return item["name"];
                });
                res.send(jobs);
            });
    });

    app.get("/searchJobs", function(req, res) {
        var jobSearch = req.param("job");

        db.collection("jobs")
            .find({ pseudo: { $regex: jobSearch, $options: "i" } })
            .toArray(function(err, docs) {
                if (err) throw err;
                console.log(docs);
                res.send(docs);
            });
    });

    app.get("/readJobsCount", function(req, res) {
        db.collection("jobs")
            .countDocuments()
            .then(count => {
                res.send({ result: count });
            });
    });
};
