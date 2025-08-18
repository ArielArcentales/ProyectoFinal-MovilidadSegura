import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViajeList from '../components/ViajeList';

function Viajes() {
  const [viajes, setViajes] = useState([]);

  const fetchViajes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/viajes');
      setViajes(response.data);
    } catch (error) { // <-- CORRECCIÓN AQUÍ
      console.error('Error al obtener los viajes:', error);
    }
  };

  useEffect(() => {
    fetchViajes();
  }, []);

  // Las funciones para crear y actualizar irán aquí más adelante

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1>Gestión de <strong>Viajes</strong></h1>
      </div>
      
      {/* Aquí irá el formulario de creación más adelante */}

      <ViajeList viajes={viajes} />
    </div>
  );
}

export default Viajes;