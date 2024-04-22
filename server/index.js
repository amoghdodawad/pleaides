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
const Accomodation = require('./models/Accomodation');
const path = require('path');
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

// app.get('/', ( req, res ) => {
//     res.end('Hello world');
// });
app.use('/',express.static('build'));

app.post('/payment-capture', async ( req, res ) => {
    if(req.body.event === 'payment.captured'){
        const { id, order_id, amount } = req.body.payload.payment.entity;
        try {
            const res = await Payments.findOneAndUpdate({ razorpay_order_id: order_id }, { razorpay_payment_id: id, razorpay_signature: req.headers['x-razorpay-signature'], amount } );
            const { kleId } = res;
            await User.findOneAndUpdate({ kleId }, { isRegistered: true, isAccomodated: amount === 350000 });
            if(amount === 350000){
                await Accomodation.create({
                    kleId,
                    aadharNumber: 'Yet to be assigned',
                    gender: 'Yet to be assigned'
                })
            }
        } catch (error) {
            
        }
    }
    res.status(200).json({ message: 'OK '});
});

app.use('/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/orders',orderRouter);

app.use((req, res, next) => {
    console.log('Here');
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

const credentials = {
    key : readFileSync('./certificates/server.key'),
    cert : readFileSync('./certificates/server.pem')
}
const server = https.createServer(credentials,app);

server.listen(PORT,'2405:201:d024:50a1:4f6d:6761:23f5:da97', () => {
    console.log(`Listening on PORT ${PORT}`);
})