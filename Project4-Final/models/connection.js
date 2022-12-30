const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    // _id: {type: Number, required: [true, 'ID is required']},
    title: {type: String, required: [true, 'title is required']},
    topic: {type: String, required: [true, 'topic is required']},
    details: {type: String, required: [true, 'details are required'], minLength: [10, 'details atleast be 10 characters long']},
    date: {type: String, required: [true, 'date is required']},
    startTime: {type: String, required: [true, 'start time is required']},
    endTime: {type: String, required: [true, 'end time is required']},
    host: {type: Schema.Types.ObjectId, ref: 'User'},
    location: {type: String, required: [true, 'location is required']},
    image: {type: String, required: [true, 'image is required']}    
},
{timestemps: true}
);

// connection name is connections in database
module.exports = mongoose.model('Connection', connectionSchema);

