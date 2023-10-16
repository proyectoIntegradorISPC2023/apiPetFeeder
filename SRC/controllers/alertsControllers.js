const Alerts = require('../models/Alerts');

exports.createAlert = async (req, res) => {
    try {
        const alert = new Alerts(req.body);
        await alert.save();
        res.status(201).json({ message: 'Alert created successfully', alert });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAlert = async (req, res) => {
    try {
        const alert = await Alerts.findById(req.params.id);
        if (!alert) throw new Error('Alert not found');
        res.status(200).json(alert);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateAlert = async (req, res) => {
    try {
        const alert = await Alerts.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alert) throw new Error('Alert not found');
        res.status(200).json({ message: 'Alert updated successfully', alert });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteAlert = async (req, res) => {
    try {
        const alert = await Alerts.findByIdAndDelete(req.params.id);
        if (!alert) throw new Error('Alert not found');
        res.status(200).json({ message: 'Alert deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllAlertsByUser = async (req, res) => {
    try {
        const alerts = await Alerts.find({ user: req.params.userId });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};