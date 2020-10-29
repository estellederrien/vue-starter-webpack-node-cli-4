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
    creation_date: Date
});

// THING SCHEMA
const ThingSchema = new Schema({
    name: String,
    creation_date: Date
});

// tRYING OUT POPULATE EXAMPLE iN GenericCrudExamples.vue
const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number
});
// tRYING OUT  POPULATE EXAMPLE  iN GenericCrudExamples.vue
const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Personnes' },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: 'Personnes' }]
});



const models = {};
models.Jokes = mongoose.model('jokes', jokesSchema);
models.jobs = mongoose.model('jobs', JobSchema);
models.things = mongoose.model('things', ThingSchema);
models.stories = mongoose.model('Story', storySchema);
models.personnes = mongoose.model('Personnes', personSchema);

module.exports = models;