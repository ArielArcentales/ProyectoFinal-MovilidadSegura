import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViajeForm from '../components/ViajeForm'; 

function Viajes() {
  const [clientes, setClientes] = useState([]);
  const [conductores, setConductores] = useState([]);

  
  useEffect(() => {
    const fetchDataForForm = async () => {
      try {

        const [clientesRes, conductoresRes] = await Promise.all([
          axios.get('http://localhost:3000/api/usuarios'),
          axios.get('http://localhost:3000/api/conductores')
        ]);
        setClientes(clientesRes.data);
        setConductores(conductoresRes.data);
      } catch (error) {
        console.error('Error al obtener los datos para el formulario:', error);
      }
    };

    fetchDataForForm();
  }, []); 

  // Nuevo viaje
  const handleCreateViaje = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/viajes', data);
      alert('Viaje registrado con éxito');

    } catch (error) {
      console.error('Error al registrar el viaje:', error);
      alert('Hubo un error al registrar el viaje');
    }
  };

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1>Gestión de <strong>Viajes</strong></h1>
        <p>Utilice el siguiente formulario para registrar un nuevo viaje.</p>
      </div>
      
      {/* formulario */}
      <ViajeForm 
        clientes={clientes} 
        conductores={conductores} 
        onSubmit={handleCreateViaje} 
      />
    </div>
  );
}

export default Viajes;