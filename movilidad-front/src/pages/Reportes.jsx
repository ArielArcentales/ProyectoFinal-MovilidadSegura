import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReporteForm from '../components/ReporteForm'; 

function Reportes() {
  
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios para el formulario:', error);
      }
    };

    fetchUsuarios();
  }, []); 

  const handleCreateReporte = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/reportes', data);
      alert('Reporte creado con éxito');

    } catch (error) {
      console.error('Error al crear el reporte:', error);
      alert('Hubo un error al crear el reporte');
    }
  };

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1><strong>Reportes</strong> de Peligros</h1>
        <p>Utilice el siguiente formulario para informar sobre un peligro.</p>
      </div>
      
      {/* formulario */}
      <ReporteForm 
        usuarios={usuarios}
        onSubmit={handleCreateReporte}
      />
    </div>
  );
}

export default Reportes;