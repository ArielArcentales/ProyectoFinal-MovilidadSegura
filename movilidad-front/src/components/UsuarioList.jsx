 import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    function UsuarioList() {
      // 1. Creamos un "estado" para guardar la lista de usuarios.
      // Empieza como un array vacío [].
      const [usuarios, setUsuarios] = useState([]);

      // 2. useEffect se ejecuta automáticamente después de que el componente se renderiza.
      // El array vacío al final `[]` significa que solo se ejecutará UNA VEZ, al principio.
      useEffect(() => {
        // 3. Definimos una función para pedir los datos al backend.
        const fetchUsuarios = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/usuarios');
            // 4. Cuando recibimos los datos, actualizamos nuestro estado.
            setUsuarios(response.data);
          } catch (error) {
            console.error('Error al obtener los usuarios:', error);
          }
        };

        fetchUsuarios(); // Llamamos a la función para que se ejecute.
      }, []);

      return (
        <div style={{ margin: '2rem auto', maxWidth: '800px' }}>
          <h2>Lista de Usuarios</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#004080', color: 'white' }}>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Correo</th>
                <th style={thStyle}>Rol</th>
                {/* Más adelante añadiremos una columna para "Acciones" (Editar/Borrar) */}
              </tr>
            </thead>
            <tbody>
              {/* 5. Usamos .map() para crear una fila <tr> por cada usuario en nuestro estado */}
              {usuarios.map((usuario) => (
                <tr key={usuario.id_usuario}>
                  <td style={tdStyle}>{usuario.nombre}</td>
                  <td style={tdStyle}>{usuario.correo}</td>
                  <td style={tdStyle}>{usuario.nombre_rol || 'No asignado'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Estilos para la tabla
    const thStyle = {
      padding: '0.8rem',
      textAlign: 'left'
    };
    
    const tdStyle = {
      padding: '0.8rem',
      borderBottom: '1px solid #ddd'
    };

    export default UsuarioList;