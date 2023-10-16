const mongoose = require('mongoose');

const petMonitorSchema = new mongoose.Schema({
    model: { type: String, required: true },
    location: { type: String, required: true },
    locationHistory: [{
        date: Date,
        coordinates: { 
            lat: Number,
            lng: Number
        }
    }],
    streamingUrls: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('PetMonitor', petMonitorSchema);