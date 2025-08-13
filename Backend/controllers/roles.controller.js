const pool = require('../database/db');

// Listar todos los roles
const listarRoles = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM roles');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar roles:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear nuevo rol
const crearRol = async (req, res) => {
  const { nombre_rol, descripcion } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO roles (nombre_rol, descripcion)
      VALUES ($1, $2) RETURNING *
    `, [nombre_rol, descripcion]);
    res.status(201).json({ mensaje: 'Rol creado', rol: result.rows[0] });
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar rol (opcional)
const eliminarRol = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM roles WHERE id_rol = $1', [id]);
    res.json({ mensaje: 'Rol eliminado' });
  } catch (error) {
    console.error('Error al eliminar rol:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  listarRoles,
  crearRol,
  eliminarRol
};