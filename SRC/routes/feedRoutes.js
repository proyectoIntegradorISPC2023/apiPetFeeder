const express = require('express');
const router = express.Router();

const feedController = require('../controllers/feedController');

// Crea un nuevo alimentador
router.post('/create', feedController.createFeed);

// Obtiene un alimentador específico
router.get('/:id', feedController.getFeed);

// Actualiza un alimentador específico
router.put('/:id', feedController.updateFeed);

// Elimina un alimentador específico
router.delete('/:id', feedController.deleteFeed);

// Obtiene todos los alimentadores de un usuario específico
router.get('/user/:userId', feedController.getAllFeedsByUser);

module.exports = router;