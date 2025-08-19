import React from 'react';
import AcompanamientoForm from '../components/AcompanamientoForm'; // ¡Importamos nuestro nuevo formulario!

function Acompanamientos() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
      </div>

      <AcompanamientoForm />

    </div>
  );
}

export default Acompanamientos;