const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
        type: String
    },
    number: {
        type: Number
    },
    time: {
        type: Number
    },
    intervalMax: {
        type: Number
    }
}, {
    collection: 'games'
});

module.exports = mongoose.model('Game', gameSchema);