// models/user.js

// LOADING LIBS
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;

// USER SCHEMA
const UserSchema = new Schema({
    _id: ObjectId,
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: String,
    permissions: Array,
    filenames: Array,
    groups: Array,
    last_update: String,
    img: String,
    birthday: String,
    age: String,
    job: String,
    mentra: String
});

module.exports = mongoose.model('User', UserSchema)