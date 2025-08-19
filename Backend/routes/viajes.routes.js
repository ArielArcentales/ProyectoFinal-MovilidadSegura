const express = require('express');
const router = express.Router();
const viajesController = require('../controllers/viajes.controller');

router.get('/', viajesController.listarViajes);
router.post('/', viajesController.crearViaje);
router.put('/:id', viajesController.actualizarEstadoViaje);

module.exports = router;