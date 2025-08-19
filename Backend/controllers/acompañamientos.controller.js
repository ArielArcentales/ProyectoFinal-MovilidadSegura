const pool = require('../database/db');

// Listar todos los acompañamientos con datos del usuario//
const listarAcompañamientos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, u.nombre AS nombre_usuario
      FROM acompañamientos a
      JOIN usuarios u ON a.id_usuario = u.id_usuario
      ORDER BY a.fecha_registro DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar acompañamientos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear nuevo acompañamiento//
const crearAcompañamiento = async (req, res) => {
  const { id_usuario, tipo_movilidad, punto_salida, destino, horario, cupos_disponibles } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO acompañamientos (id_usuario, tipo_movilidad, punto_salida, destino, horario, cupos_disponibles)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `, [id_usuario, tipo_movilidad, punto_salida, destino, horario, cupos_disponibles]);
    res.status(201).json({ mensaje: 'Acompañamiento registrado', acompañamiento: result.rows[0] });
  } catch (error) {
    console.error('Error al crear acompañamiento:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  listarAcompañamientos,
  crearAcompañamiento
};