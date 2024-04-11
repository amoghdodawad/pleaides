const { Schema, model } = require('mongoose');

const accomodationSchema = new Schema({
    kleId: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const Accomodation = new model('accomodation',accomodationSchema);

module.exports = Accomodation;