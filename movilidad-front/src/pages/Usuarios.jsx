import React from 'react';
import axios from 'axios';
import UsuarioForm from '../components/UsuarioForm';


function Usuarios() {

  const handleFormSubmit = async (data) => {

    try {
      await axios.post('http://localhost:3000/api/usuarios', data);
      alert('Usuario creado con éxito');
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert('Hubo un error al crear el usuario');
    }
  };

  return (
    // formulario
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        <h1>Gestión de <strong>Usuarios</strong></h1>
        <p>Utilice el siguiente formulario para registrar o editar usuarios.</p>
      </div>

      {/* formulario */}
      <UsuarioForm 
        onSubmit={handleFormSubmit} 
        usuarioAEditar={null} 
      />
    </div>
  );
}

export default Usuarios;