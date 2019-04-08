const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RaceSchema = new Schema({
    raceId: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username: {
        type: String,
        ref: 'users'
    },
    averageSpeed: {
        type: Number,
        required: true,
    },
    accuracy: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Race = mongoose.model('races', RaceSchema);