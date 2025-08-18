import React from 'react';
import UsuarioForm from '../components/UsuarioForm'; // ¡Importamos nuestro nuevo formulario!

function Usuarios() {
  return (
    <div>
      {/* El título principal de la página */}
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1>Gestión de <strong>Usuarios</strong></h1>
      </div>

      {/* Aquí mostramos el componente del formulario */}
      <UsuarioForm />

      {/* Más adelante, aquí irá la lista de usuarios */}
    </div>
  );
}

export default Usuarios;