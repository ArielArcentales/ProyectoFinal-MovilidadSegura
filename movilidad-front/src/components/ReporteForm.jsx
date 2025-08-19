import React from 'react';
import { useForm } from 'react-hook-form';

// 1. Recibimos la función onSubmit y la lista de usuarios para el menú desplegable.
function ReporteForm({ usuarios, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2>Crear Nuevo Reporte de Peligro</h2>

      {/* Menú desplegable para seleccionar el usuario que reporta */}
      <div style={inputGroupStyle}>
        <label htmlFor="id_usuario">Usuario que Reporta</label>
        <select id="id_usuario" {...register("id_usuario", { required: true })} style={inputStyle}>
          <option value="">Seleccione un usuario...</option>
          {usuarios.map(usuario => (
            <option key={usuario.id_usuario} value={usuario.id_usuario}>
              {usuario.nombre}
            </option>
          ))}
        </select>
        {errors.id_usuario && <span style={errorStyle}>Debe seleccionar un usuario</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="zona">Zona del Peligro</label>
        <input type="text" id="zona" {...register("zona", { required: true })} style={inputStyle} placeholder="Ej: Av. Amazonas y Eloy Alfaro" />
        {errors.zona && <span style={errorStyle}>Este campo es requerido</span>}
      </div>
      
      <div style={inputGroupStyle}>
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" {...register("descripcion", { required: true })} style={inputStyle} rows="4" placeholder="Describa el peligro..."></textarea>
        {errors.descripcion && <span style={errorStyle}>Este campo es requerido</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="ubicacion_geografica">Ubicación Geográfica (Opcional)</label>
        <input type="text" id="ubicacion_geografica" {...register("ubicacion_geografica")} style={inputStyle} placeholder="Ej: -0.180653, -78.467834" />
      </div>

      <button type="submit" style={buttonStyle}>Crear Reporte</button>
    </form>
  );
}

// Estilos (puedes copiarlos de otros formularios para mantener la consistencia)
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '500px',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  border: '1px solid #ddd'
};

const inputGroupStyle = {
  marginBottom: '1rem',
  display: 'flex',
  flexDirection: 'column'
};

const inputStyle = {
  padding: '0.8rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '1rem',
  borderRadius: '4px',
  border: 'none',
  background: '#004080',
  color: 'white',
  fontSize: '1rem',
  cursor: 'pointer'
};

const errorStyle = {
  color: 'red',
  fontSize: '0.8rem',
  marginTop: '0.2rem'
};

export default ReporteForm;