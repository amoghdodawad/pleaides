const mongoose = require('mongoose');
const User = require('../models/User');

// Establish connection
mongoose.connect('mongodb+srv://test:test1234@cluster0.vohziuq.mongodb.net/pleaides', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema
// const Schema = mongoose.Schema;
// const PersonSchema = new Schema({
//   name: String,
//   age: Number
// });
// const Person = mongoose.model('Person', PersonSchema);

async function run() {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Perform operations within the transaction
    // const newPerson = new User({ name: 'John', email: 'a@a.c', kleId: 'k' });
    // await newPerson.save({ session });
    await User.findOneAndUpdate({ name: 'John' }, { email: 'b@b.d' }, { session });
    await session.commitTransaction();
    
  } catch(error){
    // If something goes wrong, abort the transaction
    await session.abortTransaction();
    console.log('Transaction aborted.');
  } finally {
    // Clean up resources
    session.endSession();
    // mongoose.connection.close();
  }
}

run().catch(console.error);
