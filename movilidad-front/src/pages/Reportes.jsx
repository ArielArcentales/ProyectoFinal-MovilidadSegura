import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReporteList from '../components/ReporteList';

function Reportes() {
  const [reportes, setReportes] = useState([]);

  const fetchReportes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/reportes');
      setReportes(response.data);
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    }
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  // La función para crear un nuevo reporte irá aquí más adelante

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1><strong>Reportes</strong> de Peligros</h1>
      </div>
      
      {/* Aquí irá el formulario de creación más adelante */}

      <ReporteList reportes={reportes} />
    </div>
  );
}

export default Reportes;