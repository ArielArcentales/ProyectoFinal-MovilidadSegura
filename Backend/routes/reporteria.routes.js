const express = require('express');
const router = express.Router();
const reporteriaController = require('../controllers/reporteria.controller');

router.get('/', reporteriaController.listarCambios);
router.post('/', reporteriaController.registrarCambio);

module.exports = router;