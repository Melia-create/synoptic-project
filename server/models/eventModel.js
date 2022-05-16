const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String
    },
    etype: {
        type: String
    },
    date: {
        type: String,
    },
    desc: {
        type: String
    },
    contact: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
});

module.exports = mongoose.model("Event", eventSchema);