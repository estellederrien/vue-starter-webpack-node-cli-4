//models.js
const mongoose = require('mongoose');

// ===============
// Database Config
// ===============
const Schema = mongoose.Schema;
mongoose.connect("mongodb+srv://jose:windsurf@cluster0-6kmcn.azure.mongodb.net/vue-starter-webpack?retryWrites=true&w=majority", { useNewUrlParser: true });

// =======
// Schemas
// =======

const jokesSchema = new Schema({
    content: String,
    created: { type: Date, default: Date.now }
}, { strict: false });

// JOB SCHEMA
const JobSchema = new Schema({
    name: String,
    creation_date: String
});


const models = {};
models.Jokes = mongoose.model('jokes', jokesSchema);
models.jobs = mongoose.model('jobs', JobSchema);

module.exports = models;