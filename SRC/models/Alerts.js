const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    type: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    seen: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);