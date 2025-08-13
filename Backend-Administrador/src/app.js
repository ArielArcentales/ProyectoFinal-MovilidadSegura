const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const rutasUsuarios = require('./rutas/rutas.usuarios');
app.use('/api/usuarios', rutasUsuarios);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});