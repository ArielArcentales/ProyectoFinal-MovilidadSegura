import React from 'react';
import { useForm } from 'react-hook-form';
import GoogleLocationPicker from './GoogleLocationPicker';

function ReporteForm({ usuarios, onSubmit }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const handleLocationChange = (location) => {
    setValue('ubicacion_geografica', location, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
      <h2>Crear Nuevo Reporte de Peligro</h2>
      
      
      <div className="input-group">
        <label htmlFor="id_usuario">Usuario que Reporta</label>
        <select id="id_usuario" {...register("id_usuario", { required: true })}>
            {/*opciones*/}
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="zona">Zona del Peligro</label>
        <input type="text" id="zona" {...register("zona", { required: true })} />
      </div>

      <div className="input-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" {...register("descripcion", { required: true })} rows="4" />
      </div>
      
      {/* Input mapa*/}
      <div className="input-group">
        <label htmlFor="ubicacion_geografica">Seleccione la Ubicación en el Mapa</label>
        
        <GoogleLocationPicker onLocationSelect={handleLocationChange} />
        
        <input 
          type="hidden" 
          id="ubicacion_geografica" 
          {...register("ubicacion_geografica")}
        />
        {errors.ubicacion_geografica && <span className="error-message">{errors.ubicacion_geografica.message}</span>}
      </div>

      <button type="submit">Crear Reporte</button>
    </form>
  );
}

export default ReporteForm;