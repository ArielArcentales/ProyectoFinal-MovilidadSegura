const express = require('express');
const router = express.Router();
const {
  getReportes,
  getReporte,
  putReporte
} = require('../controladores/controlador.usuarios');
const verificarRol = require('../middlewares/verificarRol');

router.use(verificarRol('Administrador'));

router.get('/', getReportes);
router.get('/:id', getReporte);
router.put('/:id', putReporte);

module.exports = router;