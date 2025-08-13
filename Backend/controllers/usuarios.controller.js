const pool = require('../database/db');
const bcrypt = require('bcrypt');

// Listar todos los usuarios con sus roles//
const listarUsuarios = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id_usuario, u.nombre, u.correo, u.estado_usuario, r.nombre_rol
      FROM usuarios u
      LEFT JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario
      LEFT JOIN roles r ON ur.id_rol = r.id_rol
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear nuevo usuario//
const crearUsuario = async (req, res) => {
  const { nombre, correo, cedula, contraseña } = req.body;
  try {
    const hash = await bcrypt.hash(contraseña, 10);
    const result = await pool.query(`
      INSERT INTO usuarios (nombre, correo, cedula, contraseña)
      VALUES ($1, $2, $3, $4) RETURNING *
    `, [nombre, correo, cedula, hash]);
    res.status(201).json({ mensaje: 'Usuario creado', usuario: result.rows[0] });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Editar usuario//
const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, estado_usuario } = req.body;
  try {
    const result = await pool.query(`
      UPDATE usuarios SET nombre = $1, correo = $2, estado_usuario = $3
      WHERE id_usuario = $4 RETURNING *
    `, [nombre, correo, estado_usuario, id]);
    res.json({ mensaje: 'Usuario actualizado', usuario: result.rows[0] });
  } catch (error) {
    console.error('Error al editar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar usuario//
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`
      UPDATE usuarios SET estado_usuario = 'eliminado'
      WHERE id_usuario = $1
    `, [id]);
    res.json({ mensaje: 'Usuario eliminado lógicamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Asignar rol a usuario//
const asignarRol = async (req, res) => {
  const { id_usuario, id_rol } = req.body;
  try {
    await pool.query(`
      INSERT INTO usuarios_roles (id_usuario, id_rol)
      VALUES ($1, $2)
      ON CONFLICT (id_usuario, id_rol) DO NOTHING
    `, [id_usuario, id_rol]);
    res.json({ mensaje: 'Rol asignado correctamente' });
  } catch (error) {
    console.error('Error al asignar rol:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  listarUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  asignarRol
};