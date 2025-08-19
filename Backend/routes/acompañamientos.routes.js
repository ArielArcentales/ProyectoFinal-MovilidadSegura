const express = require('express');
const router = express.Router();
const acompañamientosController = require('../controllers/acompañamientos.controller');

router.get('/', acompañamientosController.listarAcompañamientos);
router.post('/', acompañamientosController.crearAcompañamiento);

module.exports = router;