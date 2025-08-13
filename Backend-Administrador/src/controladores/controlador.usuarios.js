const pool = require('../configuración/db');
const bcrypt = require('bcrypt');

exports.asignarRol = async (req, res) => {
  const { id } = req.params;
  const { id_rol } = req.body;

  try {
    const usuario = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
    if (usuario.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const rol = await pool.query('SELECT * FROM roles WHERE id_rol = $1', [id_rol]);
    if (rol.rowCount === 0) {
      return res.status(400).json({ mensaje: 'Rol inválido' });
    }

    await pool.query(
      `INSERT INTO usuarios_roles (id_usuario, id_rol)
       VALUES ($1, $2)
       ON CONFLICT (id_usuario, id_rol) DO NOTHING`,
      [id, id_rol]
    );

    res.status(200).json({ mensaje: 'Rol asignado correctamente' });
  } catch (error) {
    console.error('Error al asignar rol:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.crearUsuario = async (req, res) => {
  const { nombre, correo, contraseña, estado } = req.body;

  try {
    const existe = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (existe.rowCount > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    const nuevo = await pool.query(
      `INSERT INTO usuarios (nombre, correo, contraseña, estado)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, correo, hash, estado || 'activo']
    );

    res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevo.rows[0] });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, estado } = req.body;

  try {
    const resultado = await pool.query(
      `UPDATE usuarios SET nombre = $1, correo = $2, estado = $3 WHERE id_usuario = $4 RETURNING *`,
      [nombre, correo, estado, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario actualizado', usuario: resultado.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al editar usuario' });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      `UPDATE usuarios SET estado = 'eliminado' WHERE id_usuario = $1 RETURNING *`,
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario eliminado lógicamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

const { listarUsuariosConRoles } = require('../modelos/modelo.usurio');

async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await listarUsuariosConRoles();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar usuarios', error });
  }
}

module.exports = { obtenerUsuarios };
