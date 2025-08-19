import React from 'react';
import ConductorForm from '../components/ConductorForm'; // ¡Importamos nuestro nuevo formulario!

function Conductores() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      {/* Título principal de la página */}
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1>Gestión de <strong>Conductores</strong></h1>
      </div>

      {/* Aquí mostramos el componente del formulario de creación */}
      <ConductorForm />

      {/* En el futuro, aquí irá la lista de conductores registrados */}
    </div>
  );
}

export default Conductores;