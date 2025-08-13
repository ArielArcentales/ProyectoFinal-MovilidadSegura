const { Pool } = require('pg');
const pool = require('../configuración/db.js');

async function listarUsuariosConRoles() {
  const result = await pool.request().query(`
    SELECT u.id_usuario, u.nombre, u.correo, u.estado,
           STRING_AGG(r.nombre_rol, ', ') AS roles
    FROM usuarios u
    JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario
    JOIN roles r ON ur.id_rol = r.id_rol
    WHERE u.estado = 'activo'
    GROUP BY u.id_usuario, u.nombre, u.correo, u.estado
  `);
  return result.recordset;
}

module.exports = { listarUsuariosConRoles };

