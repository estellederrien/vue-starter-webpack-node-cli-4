// This data schema is mainly used in the calendar.vue component !
// Ce schema de data est principlamenet utilisé dans calendar.vue pour ajouter un évènement !

// LOADING LIBS
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;

// EVENT SCHEMA
const EventSchema = new Schema({
    _id: ObjectId,
    start: Date,
    end: Date,
    title: String,
    content: String,
    contentFull: String,
    class: String
});

module.exports = mongoose.model('Event', EventSchema)