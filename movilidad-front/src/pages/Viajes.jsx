import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViajeList from '../components/ViajeList';
import ViajeForm from '../components/ViajeForm';

function Viajes() {
  const [viajes, setViajes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [conductores, setConductores] = useState([]);

  const fetchData = async () => { };
  useEffect(() => { fetchData(); }, []);
  const handleCreateViaje = async (data) => { };

  // Actualizar estado de viaje
  const handleUpdateEstado = async (viajeId, nuevoEstado) => {
    try {
      // Peticion
      await axios.put(`http://localhost:3000/api/viajes/${viajeId}`, { estado_viaje: nuevoEstado });
      alert('Estado del viaje actualizado con éxito');
      fetchData(); // Recargamos los datos
    } catch (error) {
      console.error('Error al actualizar el estado del viaje:', error);
      alert('Hubo un error al actualizar el estado del viaje.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        
      </div>
      
      <ViajeForm 
        clientes={clientes} 
        conductores={conductores} 
        onSubmit={handleCreateViaje} 
      />
      
    </div>
  );
}

export default Viajes;