// -----------------------------------SOlutions CRUD -------------------------------------------
module.exports = function(app, db) {
  // GET SOLUTIONS
  app.post("/getSolutions", function(req, res, next) {
    MongoClient.connect(url, (err, client) => {
      var db = client.db("solutions");

      db.collection("solutions")
        .find({})
        .toArray(function(err, docs) {
          if (err) throw err;
          res.send(docs);
          client.close();
        });
    });
  });

  app.get("/getSolution", function(req, res, next) {
    // PARAMETRES
    identifiant = req.param("id");

    MongoClient.connect(url, (err, client) => {
      var ObjectId = require("mongodb").ObjectID; //working
      var idObj = ObjectId(identifiant); //working

      db.collection("solutions").findOne(
        {
          _id: idObj
        },
        function(findErr, result) {
          if (findErr) throw findErr;
          res.send(result);
          client.close();
        }
      );
    });
  });

  app.post("/updateSolution", function(req, res, next) {
    mySolution = req.body;

    MongoClient.connect(
      url,
      {
        useNewUrlParser: true
      },
      (err, client) => {
        if (err) throw err;

        var ObjectId = require("mongodb").ObjectID; //working
        var idObj = ObjectId(mySolution._id); //working

        delete mySolution._id;
        try {
          db.collection("solutions").replaceOne(
            {
              _id: idObj
            },
            mySolution
          );
          client.close();
        } catch (e) {
          console.log(e);
        }
      }
    );
  });

  app.post("/insertSolution", function(req, res, next) {
    solution = req.body;
    MongoClient.connect(url, (err, client) => {
      try {
        db.collection("clubs").insertOne(solution);
        client.close();
      } catch (e) {
        console.log(e);
      }
    });
  });

  app.get("/getSolutionsCount", function(req, res, next) {
    MongoClient.connect(url, (err, client) => {
      db.collection("clubs")
        .countDocuments()
        .then(count => {
          res.send({ result: count });
          client.close();
        });
    });
  });

  app.post("/solveSolution", function(req, res, next) {
    // PARAMETRES
    solution = req.body;

    var solver = require("javascript-lp-solver"),
      results,
      model = {
        optimize: "capacity",
        opType: "max",
        constraints: {
          plane: { max: 44 },
          person: { max: 512 },
          cost: { max: 300000 }
        },
        variables: {
          brit: {
            capacity: 20000,
            plane: 1,
            person: 8,
            cost: 5000
          },
          yank: {
            capacity: 30000,
            plane: 1,
            person: 16,
            cost: 9000
          }
        }
      };

    results = solver.Solve(model);
    console.log(results);
    res.send(results);
  });
};
