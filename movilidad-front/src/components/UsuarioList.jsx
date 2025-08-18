import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);

  // La función para obtener los usuarios sigue igual
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  // NUEVO: Función para manejar la eliminación de un usuario
  const handleDelete = async (id) => {
    // Pedimos confirmación al usuario para evitar borrados accidentales
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmacion) {
      return; // Si el usuario cancela, no hacemos nada
    }

    try {
      // Hacemos la petición DELETE al backend, pasando el ID del usuario en la URL
      await axios.delete(`http://localhost:3000/api/usuarios/${id}`);
      
      // Para actualizar la lista visualmente SIN recargar la página:
      // Filtramos el array de usuarios, quedándonos solo con los que NO tengan el ID que acabamos de borrar.
      setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id));
      
      alert('Usuario eliminado con éxito');

    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      alert('Hubo un error al eliminar el usuario.');
    }
  };

  return (
    <div style={{ margin: '2rem auto', maxWidth: '800px' }}>
      <h2>Lista de Usuarios</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#004080', color: 'white' }}>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Correo</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Acciones</th> {/* NUEVO: Columna para los botones */}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td style={tdStyle}>{usuario.nombre}</td>
              <td style={tdStyle}>{usuario.correo}</td>
              <td style={tdStyle}>{usuario.nombre_rol || 'No asignado'}</td>
              <td style={tdStyle}>
                {/* NUEVO: Botón de eliminar que llama a nuestra función handleDelete */}
                <button 
                  onClick={() => handleDelete(usuario.id_usuario)} 
                  style={deleteButtonStyle}
                >
                  Eliminar
                </button>
                {/* Aquí podríamos añadir un botón de "Editar" en el futuro */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Estilos
const thStyle = { /* ... */ };
const tdStyle = { /* ... */ };

// NUEVO: Estilo para el botón de eliminar
const deleteButtonStyle = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  background: '#dc3545', // Un color rojo para indicar peligro
  color: 'white',
  cursor: 'pointer'
};

export default UsuarioList;