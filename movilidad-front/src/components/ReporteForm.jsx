import React from 'react';
import { useForm } from 'react-hook-form';

function ReporteForm({ usuarios, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
      <h2>Nuevo Reporte de Peligro</h2>

      <div className="input-group">
        <label htmlFor="id_usuario">Usuario que Reporta</label>
        <select id="id_usuario" {...register("id_usuario", { required: true })} className="modern-form-input">
          <option value="">Seleccione un usuario...</option>
          {usuarios.map(usuario => (
            <option key={usuario.id_usuario} value={usuario.id_usuario}>
              {usuario.nombre}
            </option>
          ))}
        </select>
        {errors.id_usuario && <span style={{ color: 'red', fontSize: '0.8rem' }}>Debe seleccionar un usuario</span>}
      </div>

      <div className="input-group">
        <label htmlFor="zona">Zona del Peligro</label>
        <input type="text" id="zona" {...register("zona", { required: true })} placeholder="Ej: Av. Amazonas y Eloy Alfaro" />
      </div>
      
      <div className="input-group">
        <label htmlFor="descripcion">Descripción</label>
        {/* Para los <textarea> también podemos usar la clase 'modern-form-input' */}
        <textarea id="descripcion" {...register("descripcion", { required: true })} className="modern-form-input" rows="4" placeholder="Describa el peligro..."></textarea>
      </div>

      <div className="input-group">
        <label htmlFor="ubicacion_geografica">Ubicación Geográfica (Opcional)</label>
        <input type="text" id="ubicacion_geografica" {...register("ubicacion_geografica")} placeholder="Ej: -0.180653, -78.467834" />
      </div>

      <button type="submit">Crear Reporte</button>
    </form>
  );
}

export default ReporteForm;