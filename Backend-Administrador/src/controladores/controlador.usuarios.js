const pool = require('../configuración/db.js');

exports.crearUsuario = async (req, res) => {
  const { nombre, correo, cedula, contraseña } = req.body;
  try {
    const existe = await pool.query('SELECT * FROM usuarios WHERE correo = $1 OR cedula = $2', [correo, cedula]);
    if (existe.rows.length > 0) return res.status(400).json({ mensaje: 'Usuario ya registrado' });

    await pool.query(
      'INSERT INTO usuarios (nombre, correo, cedula, contraseña) VALUES ($1, $2, $3, $4)',
      [nombre, correo, cedula, contraseña]
    );
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};