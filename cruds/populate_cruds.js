// ---------------------------------- MONGOOSE POPULATE CRUD -------------------------------------------
module.exports = function(app, db, middleware, Stories, ObjectId) {


    console.log('************************************DEBUG 1******************************')
    Stories.find({ title: 'New Title' }).populate('author').exec(function(err, av) {
        if (err)
            console.log(err);
        console.log('************************************DEBUG 2******************************')
        console.log(av)
            // res.json(av);
    });

    app.get("/readStories", function(req, res) {


        Stories.find({ title: 'New Title' }).populate('author').exec(function(err, av) {
            if (err)
                res.log(err);
            console.log(av)
            res.json(av);
        });



    });


};