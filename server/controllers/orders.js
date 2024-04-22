const Razorpay = require('razorpay');
const User = require('../models/User');
const Payments = require('../models/Payment');

const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET || '2HLMAwxZmBjyEXG2HkWpaywV';
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_xUeR6QGk0YyHI9';

async function register( req, res, next ){
    if(!req.body.email) {
        return res.status(400).json({ error: 'email is required to register '});
    }
    if(req.body.email.split('@').length !== 2) {
        return res.status(400).json({ error: 'Invalid email'})
    }
    const user = await User.findOne({ email: req.body.email }, { _id: 0, kleId: 1, isRegistered: 1 });
    if(user && user.isRegistered === true) {
        return res.status(403).json({ message: 'User already registered' });
    }
    const isKle = req.body.email?.split('@')[1]?.split('.')[0] === 'kletech'
    try {
        const instance = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_SECRET
        });
        const options = {
            amount: isKle ? 50000 : req.body.pkg === 1 ? 2500*100 : 3500*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_743941",
        };

        const order = await instance.orders.create(options);
        await Payments.create({
            razorpay_order_id: order.id,
            kleId: user.kleId,
            email: req.body.email,
            paymentType: 'register'
        });
        

        if (!order) return res.status(500).send("Some error occured");
        res.json(order);
    } catch (err) {
        // console.log(err);
        res.status(500).send(err);
    }
}

module.exports = { register };