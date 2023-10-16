const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: String,
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
    devices: {
        petFeeders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PetFeeder' }],
        petMonitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PetMonitor' }]
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);