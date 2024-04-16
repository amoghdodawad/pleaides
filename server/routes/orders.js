const router = require('express').Router();
const Razorpay = require('razorpay');
const User = require('../models/User');
const Payments = require('../models/Payment');

const RAZORPAY_SECRET = '2HLMAwxZmBjyEXG2HkWpaywV';
const RAZORPAY_KEY_ID = 'rzp_test_xUeR6QGk0YyHI9';

router.post('/register', async ( req, res ) => {
    // console.log(req.body);
    if(!req.body.email) {
        return res.status(400).json({ error: 'email is required to register '});
    }
    if(req.body.email.split('@').length !== 2) {
        return res.status(400).json({ error: 'Invalid email'})
    }
    const user = await User.findOne({ email: req.body.email }, { _id: 0, kleId: 1, isRegistered: 1 });
    if(user && user.isRegistered === true) {
        return res.status(403).json({ message: 'User already registered'});
    }
    try {
        const instance = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_SECRET
        });
        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_743941",
        };

        const order = await instance.orders.create(options);
        await Payments.create({
            razorpay_order_id: order.id,
            kleId: user.kleId,
            paymentType: 'register'
        })

        if (!order) return res.status(500).send("Some error occured");
        console.log(order.id);
        res.json(order);
    } catch (err) {
        // console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;