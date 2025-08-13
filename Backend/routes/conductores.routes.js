const express = require('express');
const router = express.Router();
const conductoresController = require('../controllers/conductores.controller');

router.get('/', conductoresController.listarConductores);
router.post('/', conductoresController.crearConductor);
router.put('/:id', conductoresController.actualizarConductor);

module.exports = router;