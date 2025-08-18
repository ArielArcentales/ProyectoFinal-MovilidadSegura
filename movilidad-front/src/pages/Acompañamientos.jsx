import React from 'react';
import AcompanamientoForm from '../components/AcompanamientoForm'; // ¡Importamos nuestro nuevo formulario!

function Acompanamientos() {
  return (
    <div>
      {/* El título principal de la página */}
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1>Gestión de <strong>Acompañamientos</strong></h1>
      </div>

      {/* Aquí mostramos el componente del formulario de creación */}
      <AcompanamientoForm />

      {/* Más adelante, aquí irá la lista de acompañamientos existentes */}
    </div>
  );
}

export default Acompanamientos;