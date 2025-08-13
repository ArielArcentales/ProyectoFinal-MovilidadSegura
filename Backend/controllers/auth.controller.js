const pool = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    const usuario = result.rows[0];

    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    // Obtener roles//
    const rolesRes = await pool.query(`
      SELECT r.nombre_rol FROM usuarios_roles ur
      JOIN roles r ON ur.id_rol = r.id_rol
      WHERE ur.id_usuario = $1
    `, [usuario.id_usuario]);

    const roles = rolesRes.rows.map(r => r.nombre_rol);

    const token = jwt.sign(
      { id: usuario.id_usuario, roles },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = { login };