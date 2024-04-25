const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'techfest@kletech.ac.in',
      pass: 'empy xguz strd qooe'
    }
});

async function sendMail(options){
    const mailOptions = {...options, from:'techfest@kletech.ac.in' };
    return new Promise(( resolve, reject ) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                reject(error);
            } else {
            //   console.log(info);
              resolve(info);
            }
          });
    })
}

async function createAndSendMail(options){
    let text = `Your registration${options.isAccomodated ? ' and accomodation' : ''} has been confirmed. Your KLE ID is ${options.kleId} Please use this KLE ID for all the future event registrations.`;

    const mailOptions = {
        to: options.to,
        subject: 'Your registration to Pleiades 2024 is confirmed',
        text
    };
    return new Promise(async ( resolve, reject ) => {
        try {
            await sendMail(mailOptions);
            resolve('Done')
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = { createAndSendMail };