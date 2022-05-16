const Event = require('../models/eventModel');
const asyncHandler = require('express-async-handler');

// Get all goals
//GET api/events
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find()

    res.status(200).json(events)
});

const createEvent = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const event = await Event.create(req.body)

    res.status(200).json(event)
});

module.exports = {
    createEvent,
    getEvents, 
}