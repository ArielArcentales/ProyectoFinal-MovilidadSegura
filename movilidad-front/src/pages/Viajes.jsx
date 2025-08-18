import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViajeList from '../components/ViajeList';
import ViajeForm from '../components/ViajeForm'; // 1. IMPORTAMOS EL NUEVO FORMULARIO

function Viajes() {
  const [viajes, setViajes] = useState([]);
  // 2. NUEVOS ESTADOS para los menús desplegables
  const [clientes, setClientes] = useState([]);
  const [conductores, setConductores] = useState([]);

  // 3. Función para obtener TODOS los datos necesarios
  const fetchData = async () => {
    try {
      // Hacemos las 3 peticiones a la vez para más eficiencia
      const [viajesRes, clientesRes, conductoresRes] = await Promise.all([
        axios.get('http://localhost:3000/api/viajes'),
        axios.get('http://localhost:3000/api/usuarios'), // Asumimos que aquí están los clientes
        axios.get('http://localhost:3000/api/conductores')
      ]);
      setViajes(viajesRes.data);
      setClientes(clientesRes.data);
      setConductores(conductoresRes.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // 4. useEffect ahora llama a la nueva función `fetchData`
  useEffect(() => {
    fetchData();
  }, []);

  // 5. NUEVA FUNCIÓN para manejar la creación de un viaje
  const handleCreateViaje = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/viajes', data);
      alert('Viaje registrado con éxito');
      fetchData(); // Refrescamos todos los datos (incluida la lista de viajes)
    } catch (error) {
      console.error('Error al registrar el viaje:', error);
      alert('Hubo un error al registrar el viaje');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1>Gestión de <strong>Viajes</strong></h1>
      </div>
      
      {/* 6. Mostramos el formulario y le pasamos los datos y la función que necesita */}
      <ViajeForm 
        clientes={clientes} 
        conductores={conductores} 
        onSubmit={handleCreateViaje} 
      />
      
      <hr style={{ maxWidth: '1000px', margin: '2rem auto', width: '100%' }} />

      <ViajeList viajes={viajes} />
    </div>
  );
}

export default Viajes;