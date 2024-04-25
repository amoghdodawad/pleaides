const mongoose = require("mongoose");
const Events = require("../models/Competition");
const competitionRegistration = require("../models/CompetitionRegistration");
const User = require("../models/User");
const { session } = require("passport");
const CompetitionRegistration = require("../models/CompetitionRegistration");
const Competition = require("../models/Competition");
// const { session } = require("passport");

async function findAll( req, res ){
    try {
        const events = await Events.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Some error' });
    }
}

async function findByEventId( req, res ){
    try {
        const { eventId } = req.params;
        const events = await Events.find({ eventId });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Some error' });
    }
}

// async function registerToEvent( req, res ){
//     // res.status(200).json('OK');
//     try {
//         const { participantKleIds, eventId } = req.body;
//         const teamleadKleId = participantKleIds[0];
//         // console.log(eventId,participantKleIds);
//         const session = await mongoose.startSession();
//         // console.log(session.commitTransaction);
//         session.startTransaction();
//         const res2 = await User.updateMany({ kleId: [] }, { $push: { 'registeredEventIds': eventId }});
//         const ress = await Promise.all(participantKleIds.map(async ( kleId ) => {
//             // console.log(kleId);
//             return new Promise(async ( resolve, reject ) => {
//                 try {
//                     const user = await User.findOneAndUpdate({ kleId, isRegistered: true }, {
//                         $push: {
//                             'registeredEventIds': eventId
//                         }
//                     }).session(session);
//                     // console.log(user,kleId);
//                     if(user === null || user?.registeredEventIds?.length > 4){
//                         console.log('Rejecting');
//                         return reject('No user with kleId '+kleId);
//                     }
//                     return resolve('');
//                     // console.log(user);
//                 } catch (error) {
//                     console.log(kleId);
//                     reject({ error, kleId });
//                 }
                
//             })            
//         }));
//         const registrationId = eventId + '_' + teamleadKleId;
//         console.log(registrationId);
//         await competitionRegistration.create([{
//             eventId,
//             registrationId,
//             participantKleIds
//         }], { session })
//         await session.commitTransaction();
//         res.status(200).json('OK');
//     } catch (error) {
//         // await session.abortTransaction();
//         console.log('Error',error.kleId, error.error);
//         res.status(400).json('Not OK');
//     } finally {
//         // session.endSession();
//     }
// }

async function registerToEvent( req, res ){
    // try {
    //     console.log(this.connection);
    //     const { eventId, participantKleIds } = req.body;
    //     const teamleadKleId = participantKleIds[0];
    //     const session = await mongoose.startSession();
    //     participantKleIds.shift();
    //     // console.log(teamleadKleId);
    //     // console.log(participantKleIds);
    //     session.startTransaction();
    //     const user = await User.findOneAndUpdate(
    //         { kleId: teamleadKleId, isRegistered: true }, 
    //         { $push: { registeredEventIds: eventId }},
    //         { session }
    //     );
    //     await session.commitTransaction();
    //     console.log(user);
    //     // await session.withTransaction(async () => {
    //     //     const user = await User.findOneAndUpdate(
    //     //         { kleId: teamleadKleId, isRegistered: true }, 
    //     //         { $push: { registeredEventIds: eventId }},
    //     //         { session }
    //     //     );
    //     //     // console.log(user);
    //     //     if(user === null) {
    //     //         throw new Error('User not registered');
    //     //     }
    //     // });
    //     return res.json('Ok')
    // } catch (error) {
    //     await session.abortTransaction();
    //     console.log('Transaction aborted.');
    //     res.status(400).send("Server Error");
    // } finally {
    //     session.endSession();
    //     // session.endTransaction();
    // }
    const session = await mongoose.startSession();
    session.startTransaction();
    const { participantKleIds, eventId } = req.body;
    const teamleadKleId = participantKleIds[0];
    participantKleIds.shift();
    try {
        // Perform operations within the transaction
        // const newPerson = new User({ name: 'John', email: 'a@a.c', kleId: 'k' });
        // await newPerson.save({ session });
        // await User.findOneAndUpdate({ name: 'John' }, { email: 'a@b.f' }, { session });
        let user = await User.findOneAndUpdate(
            { kleId: teamleadKleId, isRegistered: true }, 
            { $push: { registeredEventIds: eventId } }, 
            { session }
        );
        if(user === null){
            throw new Error(`User with KLE ID: ${teamleadKleId} doesn't exist`);
        }
        if(participantKleIds.length > 0){
            const arr = await Promise.all(participantKleIds.map(async ( kleId ) => {
                return await User.findOneAndUpdate(
                    { kleId, isRegistered: true }, 
                    { $push: { registeredEventIds: eventId }}, 
                    { session }
                );
            }));
            for(const usr of arr){
                if(usr === null){
                    throw new Error('KLE ID of one of the teammates is incorrect');
                }
            };
        }

        const registrationId = eventId + '_' + teamleadKleId;
        const reg = new CompetitionRegistration({ eventId, registrationId, participantKleIds: [ teamleadKleId, ...participantKleIds ]});
        await reg.save({ session });
        await session.commitTransaction();
        res.status(200).json({ message: 'Team registration successful', registrationId });
    } catch(error){
        // If something goes wrong, abort the transaction
        // console.log(error);
        let { message } = error;
        if(error.code){
            message = 'Registration for the following competition already exists for the given team. Try registering with a different team'
        }
        res.status(400).json({ message });
        await session.abortTransaction();
        console.log('Transaction aborted.');
    } finally {
        // Clean up resources
        session.endSession();
        // mongoose.connection.close();
        // res.status(200).json('OK');
    }
}

async function createCompetition( req, res ){
    const { eventId, eventName, eventDescription } = req.body;
    await Competition.create({ eventId, eventName, eventDescription });
    res.json('OK');
}

module.exports = { findAll, findByEventId, registerToEvent, createCompetition };