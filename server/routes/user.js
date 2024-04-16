const router = require('express').Router();
const Events = require('../models/Event');
const Users = require('../models/User');

router.get('/:email',async ( req, res ) => {
    const { email } = req.params;
    try {
        // console.time();
        const data = await Users.findOne({ email }, { password: 0, _id: 0 });
        if(!data) return res.status(404).json({ message: 'User doesn\'t exist' });

        const arr = new Array();
        await Promise.all(data.registeredEventIds.map(async ( eventId ) => {
            const event = await Events.findOne({ _id: eventId }, { _id: 0 });
            arr.push(event);
        }));
        // console.timeEnd();
        data["_doc"].registeredEventIds = undefined;
        data["_doc"].registeredEvents = [...arr];

        return res.status(200).json({ data });

    } catch (error) {
        return res.status(500).json({ error });
    }
    
})

module.exports = router;