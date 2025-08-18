import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViajeList from '../components/ViajeList';
import ViajeForm from '../components/ViajeForm';

function Viajes() {
  const [viajes, setViajes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [conductores, setConductores] = useState([]);

  const fetchData = async () => { /* ... (código sin cambios) ... */ };
  useEffect(() => { fetchData(); }, []);
  const handleCreateViaje = async (data) => { /* ... (código sin cambios) ... */ };

  // NUEVO: Función para manejar la actualización del estado de un viaje
  const handleUpdateEstado = async (viajeId, nuevoEstado) => {
    try {
      // Hacemos una petición PUT a la URL del backend
      // El backend espera el nuevo estado en el cuerpo de la petición
      await axios.put(`http://localhost:3000/api/viajes/${viajeId}`, { estado_viaje: nuevoEstado });
      alert('Estado del viaje actualizado con éxito');
      fetchData(); // Refrescamos todos los datos para que la lista muestre el cambio
    } catch (error) {
      console.error('Error al actualizar el estado del viaje:', error);
      alert('Hubo un error al actualizar el estado del viaje.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1>Gestión de <strong>Viajes</strong></h1>
      </div>
      
      <ViajeForm 
        clientes={clientes} 
        conductores={conductores} 
        onSubmit={handleCreateViaje} 
      />
      
      <hr style={{ maxWidth: '1000px', margin: '2rem auto', width: '100%' }} />

      {/* Le pasamos la nueva función a ViajeList */}
      <ViajeList viajes={viajes} onUpdateEstado={handleUpdateEstado} />
    </div>
  );
}

export default Viajes;