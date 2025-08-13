const pool = require('../database/db');

// Listar todos los viajes con datos del conductor y cliente//
const listarViajes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, 
             c.nombre AS nombre_conductor, 
             u.nombre AS nombre_cliente
      FROM viajes v
      LEFT JOIN conductores c ON v.id_conductor = c.id_conductor
      LEFT JOIN usuarios u ON v.id_cliente = u.id_usuario
      ORDER BY v.fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar viajes:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Registrar nuevo viaje//
const crearViaje = async (req, res) => {
  const { id_conductor, id_cliente, punto_origen, punto_destino, fecha } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO viajes (id_conductor, id_cliente, punto_origen, punto_destino, fecha)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [id_conductor, id_cliente, punto_origen, punto_destino, fecha]);
    res.status(201).json({ mensaje: 'Viaje registrado', viaje: result.rows[0] });
  } catch (error) {
    console.error('Error al registrar viaje:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar estado del viaje//
const actualizarEstadoViaje = async (req, res) => {
  const { id } = req.params;
  const { estado_viaje } = req.body;
  try {
    const result = await pool.query(`
      UPDATE viajes SET estado_viaje = $1
      WHERE id_viaje = $2 RETURNING *
    `, [estado_viaje, id]);
    res.json({ mensaje: 'Estado actualizado', viaje: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar estado del viaje:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  listarViajes,
  crearViaje,
  actualizarEstadoViaje
};