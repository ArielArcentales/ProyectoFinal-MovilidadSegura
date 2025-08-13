const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.listarUsuarios);
router.post('/', usuariosController.crearUsuario);
router.put('/:id', usuariosController.editarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);
router.post('/asignar-rol', usuariosController.asignarRol);

module.exports = router;