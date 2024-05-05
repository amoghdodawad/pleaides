const Events = require("../models/Competition");
const User = require("../models/User");

async function getUser( req, res ){
    let { email } = req.body;
    if(email === undefined) email = req.params.email;
    try {
        const data = await User.findOne({ email }, { password: 0, _id: 0 });
        if(!data) return res.status(404).json({ message: 'User doesn\'t exist' });

        const arr = new Array();
        await Promise.allSettled(data.registeredEventIds.map(async ( eventId ) => {
            try {
                const event = await Events.findOne({ eventId }, { _id: 0 });
                arr.push(event);
            } catch (error) {
                
            }
        }));
        
        data["_doc"].registeredEventIds = undefined;
        data["_doc"].registeredEvents = [...arr];

        return res.status(200).json({ data });

    } catch (error) {
        return res.status(500).json({ error });
    }
};

async function updateUser( req, res ){
    const { email, college, contactNumber, semester, gender } = req.body;
    try {
        await User.findOneAndUpdate({ email }, { college, contactNumber, semester, gender });
        res.status(200).json({ message: 'OK'});
    } catch (error) {
        res.status(500).json({ message: 'Not OK' });
    }
}

module.exports = { getUser, updateUser };