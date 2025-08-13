const verificarRol = (rolRequerido) => {
  return (req, res, next) => {
    const roles = req.usuario?.roles || [];
    if (!roles.includes(rolRequerido)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol insuficiente' });
    }
    next();
  };
};

module.exports = verificarRol;