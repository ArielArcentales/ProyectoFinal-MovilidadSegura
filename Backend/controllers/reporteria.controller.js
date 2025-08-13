const pool = require('../database/db');

// Listar todos los registros de cambios
const listarCambios = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.*, 
             u.nombre AS usuario_afectado, 
             a.nombre AS administrador
      FROM log_cambios l
      LEFT JOIN usuarios u ON l.id_usuario = u.id_usuario
      LEFT JOIN usuarios a ON l.realizado_por = a.id_usuario
      ORDER BY l.fecha_cambio DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar cambios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Registrar un cambio manualmente
const registrarCambio = async (req, res) => {
  const { id_usuario, campo_modificado, valor_anterior, valor_nuevo, realizado_por } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO log_cambios (id_usuario, campo_modificado, valor_anterior, valor_nuevo, realizado_por)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [id_usuario, campo_modificado, valor_anterior, valor_nuevo, realizado_por]);
    res.status(201).json({ mensaje: 'Cambio registrado', log: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar cambio:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  listarCambios,
  registrarCambio
};