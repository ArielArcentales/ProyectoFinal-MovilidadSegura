import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReporteList from '../components/ReporteList';
import ReporteForm from '../components/ReporteForm'; // 1. IMPORTAMOS EL NUEVO FORMULARIO

function Reportes() {
  const [reportes, setReportes] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // 2. NUEVO ESTADO para la lista de usuarios

  // 3. Función para obtener TODOS los datos necesarios
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

  // 4. useEffect ahora llama a la nueva función `fetchData`
  useEffect(() => {
    fetchData();
  }, []);

  // 5. NUEVA FUNCIÓN para manejar la creación de un reporte
  const handleCreateReporte = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/reportes', data);
      alert('Reporte creado con éxito');
      fetchData(); // Refrescamos todos los datos (incluida la lista de reportes)
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      alert('Hubo un error al crear el reporte');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
      </div>
      
      {/* 6. Mostramos el formulario y le pasamos los datos y la función que necesita */}
      <ReporteForm 
        usuarios={usuarios}
        onSubmit={handleCreateReporte}
      />
      
    </div>
  );
}

export default Reportes;