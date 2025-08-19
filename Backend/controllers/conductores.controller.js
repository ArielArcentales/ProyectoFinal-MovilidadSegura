const pool = require('../database/db');

// Listar todos los conductores//
const listarConductores = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM conductores ORDER BY fecha_registro DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar conductores:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Registrar nuevo conductor//
const crearConductor = async (req, res) => {
  const { nombre, cedula, calificacion } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO conductores (nombre, cedula, calificacion)
      VALUES ($1, $2, $3) RETURNING *
    `, [nombre, cedula, calificacion]);
    res.status(201).json({ mensaje: 'Conductor registrado', conductor: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar conductor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar estado o calificación//
const actualizarConductor = async (req, res) => {
  const { id } = req.params;
  const { estado_conductor, calificacion } = req.body;
  try {
    const result = await pool.query(`
      UPDATE conductores
      SET estado_conductor = $1, calificacion = $2
      WHERE id_conductor = $3 RETURNING *
    `, [estado_conductor, calificacion, id]);
    res.json({ mensaje: 'Conductor actualizado', conductor: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar conductor:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  listarConductores,
  crearConductor,
  actualizarConductor
};