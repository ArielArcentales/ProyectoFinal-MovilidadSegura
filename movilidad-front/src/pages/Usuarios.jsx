import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsuarioForm from '../components/UsuarioForm';
import UsuarioList from '../components/UsuarioList';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);

  const fetchUsuarios = async () => {};
  useEffect(() => { fetchUsuarios(); }, []);
  const handleFormSubmit = async (data) => { };
  const handleDelete = async (id) => { };

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
    
      <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.8rem', color: '#004080' }}>
        
      </div>

      <UsuarioForm 
        onSubmit={handleFormSubmit} 
        usuarioAEditar={usuarioAEditar} 
      />
      
    </div>
  );
}

export default Usuarios;