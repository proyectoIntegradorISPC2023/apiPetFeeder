const mongoose = require('mongoose');

const petFeederSchema = new mongoose.Schema({
    model: { type: String, required: true },
    location: { type: String, required: true },
    feedingConfig: {
        times: [Date],
        portionSize: Number
    },
    lastFill: Date,
    foodLevel: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('PetFeeder', petFeederSchema);