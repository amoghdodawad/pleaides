const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    eventId: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        // required: true
    },
    ruleBookURL: {
        type: String,
    },
    posterURL: {
        type: String,
    },
    minParticipants: {
        type: Number
    },
    maxParticipants: {
        type: Number
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    fees: {
        type: Number
    },
    ownerOneName: {
        type: String,
        // required: true
    },
    ownerOneContact: {
        type: Number,
        // required: true
    },
    ownerTwoName: {
        type: String,
    },
    ownerTwoContact: {
        type: Number,
    }
});

const Competition = new model('competition',eventSchema, 'competition');

module.exports = Competition;