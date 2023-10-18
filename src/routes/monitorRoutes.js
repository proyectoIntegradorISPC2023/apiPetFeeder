const express = require('express');
const router = express.Router();

const monitorController = require('../controllers/monitorController');

// Crea un nuevo monitor
router.post('/create', monitorController.createMonitor);

// Obtiene un monitor específico
router.get('/:id', monitorController.getMonitor);

// Actualiza un monitor específico
router.put('/:id', monitorController.updateMonitor);

// Elimina un monitor específico
router.delete('/:id', monitorController.deleteMonitor);

// Obtiene todos los monitores de un usuario específico
router.get('/user/:userId', monitorController.getAllMonitorsByUser);

module.exports = router;