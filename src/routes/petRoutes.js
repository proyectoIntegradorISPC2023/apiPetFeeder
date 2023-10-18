const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');

// Crea una nueva mascota
router.post('/create', petController.createPet);

// Obtiene una mascota específica
router.get('/:id', petController.getPet);

// Actualiza una mascota específica
router.put('/:id', petController.updatePet);

// Elimina una mascota específica
router.delete('/:id', petController.deletePet);

// Obtiene todas las mascotas de un usuario específico
router.get('/user/:userId', petController.getAllPetsByUser);

module.exports = router;