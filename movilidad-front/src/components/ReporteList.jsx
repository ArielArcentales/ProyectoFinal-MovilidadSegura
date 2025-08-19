import React from 'react';

function ReporteList({ reportes }) {
  return (
    <div style={{ margin: '2rem auto', width: '100%', maxWidth: '1000px' }}>
      <h2>Lista de Reportes</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#004080', color: 'white' }}>
            <th style={thStyle}>Usuario</th>
            <th style={thStyle}>Zona</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Ubicación</th>
            <th style={thStyle}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id_reporte}>
              <td style={tdStyle}>{reporte.nombre_usuario}</td>
              <td style={tdStyle}>{reporte.zona}</td>
              <td style={tdStyle}>{reporte.descripcion}</td>
              <td style={tdStyle}>{reporte.ubicacion_geografica}</td>
              <td style={tdStyle}>{new Date(reporte.fecha_reporte).toLocaleString()}</td>
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

export default ReporteList;