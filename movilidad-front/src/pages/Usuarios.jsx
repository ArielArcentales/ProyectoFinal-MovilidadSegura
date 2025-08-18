import React from 'react';
import UsuarioForm from '../components/UsuarioForm'; // ¡Importamos nuestro nuevo formulario!
import UsuarioList from '../components/UsuarioList';


 function Usuarios() {
      return (
        <div>
          <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
            <h1>Gestión de <strong>Usuarios</strong></h1>
          </div>

          <UsuarioForm />
          <hr style={{ maxWidth: '800px', margin: '2rem auto' }} /> {/* Una línea para separar */}
          <UsuarioList /> 

        </div>
      );
    }

    export default Usuarios;