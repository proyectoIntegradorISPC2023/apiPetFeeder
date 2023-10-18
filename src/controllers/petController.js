const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
    try {
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).json({ message: 'Pet created successfully', pet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) throw new Error('Pet not found');
        res.status(200).json(pet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pet) throw new Error('Pet not found');
        res.status(200).json({ message: 'Pet updated successfully', pet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) throw new Error('Pet not found');
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllPetsByUser = async (req, res) => {
    try {
        const pets = await Pet.find({ user: req.params.userId });
        res.status(200).json(pets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};