// LOADING LIBS
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;

// MESSAGE SCHEMA
const SocialMessageSchema = new Schema({
    _id: ObjectId,
    from: String,
    to: String,
    date: Date,
    title: String,
    content: String,
    user_img: String
});

module.exports = mongoose.model('SocialMessage', SocialMessageSchema)