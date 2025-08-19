import React from 'react';

function UsuarioList({ usuarios, onEdit, onDelete }) {
    return (
        <div style={{ margin: '2rem auto', width: '100%', maxWidth: '800px' }}>
            <h2>Lista de Usuarios</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#004080', color: 'white' }}>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Correo</th>
                        <th style={thStyle}>Rol</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id_usuario}>
                            <td style={tdStyle}>{usuario.nombre}</td>
                            <td style={tdStyle}>{usuario.correo}</td>
                            <td style={tdStyle}>{usuario.nombre_rol || 'No asignado'}</td>

                            {/* CÓDIGO CORREGIDO: La celda de acciones que faltaba */}
                            <td style={tdStyle}>
                                <button onClick={() => onEdit(usuario)} style={editButtonStyle}>
                                    Editar
                                </button>
                                <button onClick={() => onDelete(usuario.id_usuario)} style={deleteButtonStyle}>
                                    Eliminar
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Estilos
const thStyle = { padding: '0.8rem', textAlign: 'left', borderBottom: '1px solid #ddd' };
const tdStyle = { padding: '0.8rem', borderBottom: '1px solid #ddd' };
const deleteButtonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    background: '#dc3545',
    color: 'white',
    cursor: 'pointer'
};
const editButtonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    background: '#ffc107',
    color: 'black',
    cursor: 'pointer',
    marginRight: '0.5rem'
};

export default UsuarioList;