function verificarRol(rolRequerido) {
  return (req, res, next) => {
    const rolesUsuario = req.usuario.roles;
    if (!rolesUsuario.includes(rolRequerido)) {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    next();
  };
}

module.exports = verificarRol;