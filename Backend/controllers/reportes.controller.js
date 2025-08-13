const pool = require('../database/db');

// Listar todos los reportes con datos del usuario//
const listarReportes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.id_reporte, r.zona, r.descripcion, r.fecha_reporte, r.ubicacion_geografica,
             u.nombre AS nombre_usuario, u.correo
      FROM reportes_peligros r
      LEFT JOIN usuarios u ON r.id_usuario = u.id_usuario
      ORDER BY r.fecha_reporte DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar reportes:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear nuevo reporte//
const crearReporte = async (req, res) => {
  const { id_usuario, zona, descripcion, ubicacion_geografica } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO reportes_peligros (id_usuario, zona, descripcion, ubicacion_geografica)
      VALUES ($1, $2, $3, $4) RETURNING *
    `, [id_usuario, zona, descripcion, ubicacion_geografica]);
    res.status(201).json({ mensaje: 'Reporte creado', reporte: result.rows[0] });
  } catch (error) {
    console.error('Error al crear reporte:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  listarReportes,
  crearReporte
};