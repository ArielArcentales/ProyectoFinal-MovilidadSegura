const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/controlador.usuarios');

router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.editarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);
router.get('/', usuarioController.listarUsuarios);

module.exports = router;