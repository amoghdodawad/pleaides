const { Schema, model } = require('mongoose');

const eventRegistrationSchema = new Schema({
    eventId: {
        type: String,
        required: true
    },
    registrationId: {
        type: String,
        required: true
    },
    participantKleIds: {
        type: [ String ],
    }
});

const CompetitionRegistration = new model('competitionRegistration',eventRegistrationSchema);

module.exports = CompetitionRegistration;