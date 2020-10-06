// LOADING LIBS
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;

// MESSAGE SCHEMA
const MessageSchema = new Schema({
    _id: ObjectId,
    to: String,
    from: String,
    content: String,
    senderName: String,
    senderSurname: String,
    date: String,
    id: String,
    img: String,
    date: String
});

module.exports = mongoose.model('Message', MessageSchema)