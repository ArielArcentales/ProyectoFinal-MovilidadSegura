import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConductoresList() {

  const [conductores, setConductores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchConductores = async () => {
      try {
        setLoading(true);

        const response = await axios.get('/api/conductores');
        setConductores(response.data); 
        setError(''); 
      } catch (err) {
        setError('No se pudo cargar la lista de conductores.');
        console.error('Error al obtener los conductores:', err);
      } finally {

        setLoading(false);
      }
    };

    fetchConductores();
  }, []); 

  // visualización 
  if (loading) {
    return <p style={{ textAlign: 'center' }}>Cargando conductores...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  }

  return (
    <div style={containerStyle}>
      <h2>Conductores Registrados</h2>
      {conductores.length === 0 ? (
        <p>No hay conductores registrados.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Cédula</th>
              <th style={thStyle}>Calificación</th>
              <th style={thStyle}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {conductores.map((conductor) => (
              <tr key={conductor.id_conductor}>
                <td style={tdStyle}>{conductor.nombre}</td>
                <td style={tdStyle}>{conductor.cedula}</td>
                <td style={tdStyle}>{conductor.calificacion}</td>
                <td style={tdStyle}>{conductor.estado_conductor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Estilos
const containerStyle = { maxWidth: '800px', margin: '2rem auto', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' };
const thStyle = { borderBottom: '2px solid #004080', padding: '0.8rem', textAlign: 'left', background: '#f8f9fa' };
const tdStyle = { borderBottom: '1px solid #ddd', padding: '0.8rem' };

export default ConductoresList;