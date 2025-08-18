import React from 'react';

function ViajeList({ viajes }) { // Recibe los viajes desde el padre
  return (
    <div style={{ margin: '2rem auto', width: '100%', maxWidth: '1000px' }}>
      <h2>Lista de Viajes</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#004080', color: 'white' }}>
            <th style={thStyle}>Cliente</th>
            <th style={thStyle}>Conductor</th>
            <th style={thStyle}>Origen</th>
            <th style={thStyle}>Destino</th>
            <th style={thStyle}>Fecha</th>
            <th style={thStyle}>Estado</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {viajes.map((viaje) => (
            <tr key={viaje.id_viaje}>
              <td style={tdStyle}>{viaje.nombre_cliente}</td>
              <td style={tdStyle}>{viaje.nombre_conductor}</td>
              <td style={tdStyle}>{viaje.punto_origen}</td>
              <td style={tdStyle}>{viaje.punto_destino}</td>
              <td style={tdStyle}>{new Date(viaje.fecha).toLocaleString()}</td>
              <td style={tdStyle}>{viaje.estado_viaje}</td>
              <td style={tdStyle}>
                {/* Aquí irán los botones o dropdowns para cambiar el estado */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Estilos
const thStyle = { padding: '0.8rem', textAlign: 'left', borderBottom: '1px solid #ddd' };
const tdStyle = { padding: '0.8rem', borderBottom: '1px solid #ddd' };

export default ViajeList;