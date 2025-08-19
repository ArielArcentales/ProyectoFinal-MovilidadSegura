const express = require('express');
const cors = require('cors');
const app = express();
const usuariosRoutes = require('./routes/usuarios.routes');
const rolesRoutes = require('./routes/roles.routes');
const reportesRoutes = require('./routes/reportes.routes');
const acompañamientosRoutes = require('./routes/acompañamientos.routes');
const conductoresRoutes = require('./routes/conductores.routes');
const viajesRoutes = require('./routes/viajes.routes');
const reporteriaRoutes = require('./routes/reporteria.routes');
const authRoutes = require('./routes/auth.routes');



app.use(cors()); 
app.use(express.json());
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/acompañamientos', acompañamientosRoutes);
app.use('/api/conductores', conductoresRoutes);
app.use('/api/viajes', viajesRoutes);
app.use('/api/reporteria', reporteriaRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log(' Servidor corriendo en http://localhost:3000');
});