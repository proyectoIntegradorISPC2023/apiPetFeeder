const Monitor = require('../models/Monitor');

exports.createMonitor = async (req, res) => {
    try {
        const monitor = new Monitor(req.body);
        await monitor.save();
        res.status(201).json({ message: 'Monitor created successfully', monitor });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.findById(req.params.id);
        if (!monitor) throw new Error('Monitor not found');
        res.status(200).json(monitor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!monitor) throw new Error('Monitor not found');
        res.status(200).json({ message: 'Monitor updated successfully', monitor });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMonitor = async (req, res) => {
    try {
        const monitor = await Monitor.findByIdAndDelete(req.params.id);
        if (!monitor) throw new Error('Monitor not found');
        res.status(200).json({ message: 'Monitor deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllMonitorsByUser = async (req, res) => {
    try {
        const monitors = await Monitor.find({ user: req.params.userId });
        res.status(200).json(monitors);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};