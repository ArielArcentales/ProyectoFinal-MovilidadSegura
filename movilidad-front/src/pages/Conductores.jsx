import React from 'react';
import ConductorForm from '../components/ConductorForm'; // ¡Importamos nuestro nuevo formulario!

function Conductores() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
      </div>

      <ConductorForm />

    </div>
  );
}

export default Conductores;