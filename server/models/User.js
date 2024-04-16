const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    kleId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    isAccomodated: {
        type: Boolean,
        default: false
    },
    college: {
        type: String,
    },
    semester: {
        type: Number
    },
    registeredEventIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Events'
    }]
});

const User = new model('Users',userSchema);

module.exports = User;