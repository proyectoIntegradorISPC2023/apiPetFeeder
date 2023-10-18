const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    medicalHistory: [String],
    feedingHistory: [{
        date: Date,
        foodAmount: Number
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);