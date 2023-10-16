const express = require('express');
const router = express.Router();

const alertsController = require('../controllers/alertsController');

// Crea una nueva alerta
router.post('/create', alertsController.createAlert);

// Obtiene una alerta específica
router.get('/:id', alertsController.getAlert);

// Actualiza una alerta específica
router.put('/:id', alertsController.updateAlert);

// Elimina una alerta específica
router.delete('/:id', alertsController.deleteAlert);

// Obtiene todas las alertas de un usuario específico
router.get('/user/:userId', alertsController.getAllAlertsByUser);

module.exports = router;