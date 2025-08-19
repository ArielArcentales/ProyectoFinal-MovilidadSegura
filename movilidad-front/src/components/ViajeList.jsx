import React from 'react';

// 1. Recibimos la nueva función "onUpdateEstado" como prop
function ViajeList({ viajes, onUpdateEstado }) { 
  
  // Lista de posibles estados del viaje. Deberían coincidir con los que maneja el backend.
  const estadosPosibles = ["Pendiente", "En curso", "Completado", "Cancelado"];

  return (
    <div style={{ margin: '2rem auto', width: '100%', maxWidth: '1000px' }}>
      <h2>Lista de Viajes</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#004080', color: 'white' }}>
            {/* ... (encabezados de la tabla sin cambios) ... */}
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {viajes.map((viaje) => (
            <tr key={viaje.id_viaje}>
              {/* ... (celdas de datos sin cambios) ... */}
              <td style={tdStyle}>{viaje.estado_viaje}</td>
              <td style={tdStyle}>
                {/* 2. AÑADIMOS EL MENÚ DESPLEGABLE (SELECT) */}
                <select 
                  value={viaje.estado_viaje} 
                  onChange={(e) => onUpdateEstado(viaje.id_viaje, e.target.value)}
                  style={selectStyle}
                >
                  {/* 3. Creamos una opción para cada estado posible */}
                  {estadosPosibles.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Estilos
const thStyle = { /* ... */ };
const tdStyle = { /* ... */ };
// NUEVO: Estilo para el select
const selectStyle = {
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: 'white'
};

export default ViajeList;