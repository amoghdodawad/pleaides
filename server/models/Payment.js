const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
    kleId: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    paymentType: {
        type: String
    },
    eventId: {
        type: String,
    }
});

const Payments = new model('payments',paymentSchema);

module.exports = Payments;