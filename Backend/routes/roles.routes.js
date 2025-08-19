const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles.controller');

router.get('/', rolesController.listarRoles);
router.post('/', rolesController.crearRol);

module.exports = router;