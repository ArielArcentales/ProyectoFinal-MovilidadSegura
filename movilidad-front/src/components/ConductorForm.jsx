import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// No se definen estilos aquí; todo viene de nuestro CSS global.
function ConductorForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        calificacion: parseFloat(data.calificacion)
      };

      console.log('Enviando datos de nuevo conductor:', dataToSend);

      const response = await axios.post('/api/conductores', dataToSend);

      console.log('Respuesta del servidor:', response.data);
      alert('¡Conductor registrado con éxito!');

    } catch (error) {
      console.error('Error al registrar al conductor:', error.response?.data?.mensaje || error.message);
      alert(`Error: ${error.response?.data?.mensaje || 'No se pudo conectar al servidor'}`);
    }
  };

  return (
    // Aplicamos la clase principal 'modern-form'
    <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
      <h2>Registrar Nuevo Conductor</h2>
      
      <div className="input-group">
        <label htmlFor="nombre">Nombre Completo</label>
        <input 
          type="text" 
          id="nombre" 
          {...register("nombre", { required: "El nombre es obligatorio" })} 
        />
        {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="cedula">Cédula</label>
        <input 
          type="text" 
          id="cedula" 
          {...register("cedula", { required: "La cédula es obligatoria" })} 
        />
        {errors.cedula && <span className="error-message">{errors.cedula.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="calificacion">Calificación (0 - 5)</label>
        <input 
          type="number" 
          id="calificacion" 
          {...register("calificacion", { 
            required: "La calificación es obligatoria",
            min: { value: 0, message: "La calificación no puede ser menor a 0" },
            max: { value: 5, message: "La calificación no puede ser mayor a 5" }
          })} 
          step="1"
          min="0" 
          max="5" 
        />
        {errors.calificacion && <span className="error-message">{errors.calificacion.message}</span>}
      </div>

      <button type="submit">Registrar Conductor</button>
    </form>
  );
}

export default ConductorForm;