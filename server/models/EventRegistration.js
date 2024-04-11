const { Schema, model } = require('mongoose');

const eventRegistrationSchema = new Schema({
    eventId: {
        type: String,
        required: true
    },
    participantIds: {
        type: [ String ],
    }
});

const eventRegistration = new model('eventRegistration',eventRegistrationSchema);

module.exports = eventRegistration;