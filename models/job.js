// LOADING LIBS
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;

// JOB SCHEMA
const JobSchema = new Schema({
    _id: ObjectId,
    name: String,
    creation_date: String
});

module.exports = mongoose.model('Job', JobSchema)