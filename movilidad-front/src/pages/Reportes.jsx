import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReporteForm from '../components/ReporteForm';

function Reportes() {
  const [reportes, setReportes] = useState([]);
  const [usuarios, setUsuarios] = useState([]); 

  const fetchData = async () => {
    try {
      // Pedimos los reportes y los usuarios al mismo tiempo
      const [reportesRes, usuariosRes] = await Promise.all([
        axios.get('http://localhost:3000/api/reportes'),
        axios.get('http://localhost:3000/api/usuarios')
      ]);
      setReportes(reportesRes.data);
      setUsuarios(usuariosRes.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Creación de un reporte
  const handleCreateReporte = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/reportes', data);
      alert('Reporte creado con éxito');
      fetchData(); 
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      alert('Hubo un error al crear el reporte');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
      </div>
      
      <ReporteForm 
        usuarios={usuarios}
        onSubmit={handleCreateReporte}
      />
      
    </div>
  );
}

export default Reportes;