// -------------------------------
// LOAD APP CONFIG ( FTP TOKEN,CLOUDINARY TOKEN,MONGODB ATLAS TOKEN, etc ...)- ON CHARGE LA CONFIGURATION DE L'APP ( FTP,CLOUDINARY,DB URL, etc ...)
// -------------------------------
const config = require("../config.json");
// ------------------------------
// LOAD OFFICIAL NODE MODULES - CHARGEMENT DES MODULES NODES
// -------------------------------
const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
const Schema = mongoose.Schema;
// ===============
// Mongoose Database Connect
// ===============
mongoose.connect(config.mongoDb_atlas_db, { useNewUrlParser: true });
// =======
// Schemas
// =======
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
    age: Number,
    job: String,
    mentra: String,
    social_messages: Array,
});
// GROUP SCHEMA
const GroupSchema = new Schema({
    _id: ObjectId,
    name: String,
    creation_date: String,
    users: Array,
});
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
});
// EVENT SCHEMA
const EventSchema = new Schema({
    _id: ObjectId,
    start: Date,
    end: Date,
    title: String,
    content: String,
    contentFull: String,
    class: String,
});
const jokesSchema = new Schema({
    content: String,
    created: { type: Date, default: Date.now },
}, { strict: false });
// JOB SCHEMA
const JobSchema = new Schema({
    name: String,
    creation_date: Date,
});
// THING SCHEMA
const ThingSchema = new Schema({
    name: String,
    creation_date: Date,
});
// tRYING OUT POPULATE EXAMPLE iN mongoosePopulate.vue
const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
});
// tRYING OUT  POPULATE EXAMPLE   iN mongoosePopulate.vue
const storySchema = Schema({
    author: { type: Schema.Types.ObjectId, ref: "Personnes" },
    title: String,
    fans: [{ type: Schema.Types.ObjectId, ref: "Personnes" }],
});
const models = {};
models.User = mongoose.model("User", UserSchema);
models.Group = mongoose.model("Group", GroupSchema);
models.Message = mongoose.model("Message", MessageSchema);
models.Event = mongoose.model("Event", EventSchema);
models.Jokes = mongoose.model("jokes", jokesSchema);
models.jobs = mongoose.model("jobs", JobSchema);
models.things = mongoose.model("things", ThingSchema);
models.stories = mongoose.model("Story", storySchema);
models.personnes = mongoose.model("Personnes", personSchema);
module.exports = models;