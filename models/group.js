// models/group.js

// LOADING LIBS
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;

// GROUP SCHEMA
const GroupSchema = new Schema({
    _id: ObjectId,
    name: String,
    creation_date: String,
    users: Array
});

module.exports = mongoose.model('Group', GroupSchema)