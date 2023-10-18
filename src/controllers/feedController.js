const Feed = require('../models/Feed');

exports.createFeed = async (req, res) => {
    try {
        const feed = new Feed(req.body);
        await feed.save();
        res.status(201).json({ message: 'Feed created successfully', feed });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getFeed = async (req, res) => {
    try {
        const feed = await Feed.findById(req.params.id);
        if (!feed) throw new Error('Feed not found');
        res.status(200).json(feed);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateFeed = async (req, res) => {
    try {
        const feed = await Feed.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feed) throw new Error('Feed not found');
        res.status(200).json({ message: 'Feed updated successfully', feed });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteFeed = async (req, res) => {
    try {
        const feed = await Feed.findByIdAndDelete(req.params.id);
        if (!feed) throw new Error('Feed not found');
        res.status(200).json({ message: 'Feed deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllFeedsByUser = async (req, res) => {
    try {
        const feeds = await Feed.find({ user: req.params.userId });
        res.status(200).json(feeds);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};