const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    connection: { type: Schema.Types.ObjectId, ref: 'Connection' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['YES', 'NO', 'MAYBE'],
        required: true
    }
});


module.exports = mongoose.model('Rsvp', rsvpSchema);