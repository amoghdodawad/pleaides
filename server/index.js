const https = require('https');
const express = require('express');
const { readFileSync } = require('fs');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/orders');
const passportSetup = require('./passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connect } = require('mongoose');
const Payments = require('./models/Payment');
const User = require('./models/User');
const app = express();

const PORT = process.env.PORT || 443;

connect('mongodb+srv://test:test1234@cluster0.vohziuq.mongodb.net/pleaides')
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log('DB connection error');
        console.log(err);
    })

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', ( req, res ) => {
    res.end('Hello world');
});

app.post('/payment-capture', async ( req, res ) => {
    console.log(req.body.event === 'payment.captured');
    if(req.body.event === 'payment.captured'){
        const { id, order_id } = req.body.payload.payment.entity;
        console.log(id, order_id);
        try {
            const res = await Payments.findOneAndUpdate({ razorpay_order_id: order_id }, { razorpay_payment_id: id, razorpay_signature: req.headers['x-razorpay-signature'] } );
            // console.log(res);
            const { kleId } = res;
            await User.findOneAndUpdate({ kleId }, { isRegistered: true });
        } catch (error) {
            
        }
    }
    res.status(200).json({ message: 'OK '});
})

app.use('/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/orders',orderRouter);

const credentials = {
    key : readFileSync('./certificates/server.key'),
    cert : readFileSync('./certificates/server.pem')
}
const server = https.createServer(credentials,app);

server.listen(PORT,'2405:201:d015:2a9:18cf:1d5:f886:f3f4', () => {
    console.log(`Listening on PORT ${PORT}`);
})