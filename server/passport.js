const passport = require('passport');
const User = require('./models/User');

const GoogleStratergy  = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '904561310687-6b5eemf4oa7uchpg8eklgp245hdcben8.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStratergy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
    },
    async function(accessToken, refreshToken, profile, done){
        const email = profile.emails[0].value;
        const college = email.split('@')[1].split('.')[0];
        if(college === "kletech"){
            let str = email.split('@')[0].split('e')[1];
            const year = parseInt(str[0]+str[1]);
            if(year < 20 || year > 23){
                return done(null,{ isInvalidUser: true });
            }
            // console.log(year);
        }
        // console.log(college);
        try {
            const user = await User.findOne({ email: profile.emails[0].value});

            if(user === null){
                /*
                    This should be made a new function - generateKleId(name): kleId
                */
                const tempId = (Math.floor(Math.random() * 100000) + 100000).toString().substring(1);
                // console.log(tempId);
                let newId = 'PLD';
                newId += profile.displayName.split(" ")[0].toLocaleUpperCase().slice(0,3);
                newId += tempId;
                // console.log(newId);
                // console.log(profile.displayName);
                const newUser = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    kleId: newId
                });
                const res = await newUser.save();
                // console.log(res);
            } else {
                
            }
            done(null,profile);
        } catch (err) {
            done(err,profile)
        }
    },
))
