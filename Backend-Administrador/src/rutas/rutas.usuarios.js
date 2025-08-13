const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/controlador.usuarios');
const verificarRol = require('../middlewares/verificarRol');


router.post('/:id/asignar-rol', usuarioController.asignarRol);
router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.editarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);
router.get('/', verificarRol('Administrador'), obtenerUsuarios);


module.exports = router;