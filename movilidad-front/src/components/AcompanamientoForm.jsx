import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// El diseño se importa de index.css
function AcompanamientoForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const dataToSend = {
        ...data,
        id_usuario: parseInt(data.id_usuario, 10),
        cupos_disponibles: parseInt(data.cupos_disponibles, 10)
      };

      console.log('Enviando datos:', dataToSend);
      
      const response = await axios.post('/api/acompanamientos', dataToSend);
      
      console.log('Respuesta del servidor:', response.data);
      alert('¡Acompañamiento registrado con éxito!');

    } catch (error) {
      console.error('Error al registrar el acompañamiento:', error.response?.data?.mensaje || error.message);
      alert(`Error: ${error.response?.data?.mensaje || 'No se pudo conectar al servidor'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
      <h2>Registrar Nuevo Acompañamiento</h2>
      
      <div className="input-group">
        <label htmlFor="id_usuario">ID del Usuario (Temporal)</label>
        <input 
          type="number" 
          id="id_usuario" 
          {...register("id_usuario", { required: "El ID del usuario es obligatorio" })} 
        />
        {errors.id_usuario && <span className="error-message">{errors.id_usuario.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="tipo_movilidad">Tipo de Movilidad</label>
        <select 
          id="tipo_movilidad" 
          {...register("tipo_movilidad", { required: "Debe seleccionar un tipo de movilidad" })} 
        >
          <option value="">-- Seleccione una opción --</option>
          <option value="Vehículo">Vehículo</option>
          <option value="A pie">A pie</option>
        </select>
        {errors.tipo_movilidad && <span className="error-message">{errors.tipo_movilidad.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="punto_salida">Punto de Salida</label>
        <input 
          type="text" 
          id="punto_salida" 
          {...register("punto_salida", { required: "El punto de salida es obligatorio" })} 
        />
        {errors.punto_salida && <span className="error-message">{errors.punto_salida.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="destino">Destino</label>
        <input 
          type="text" 
          id="destino" 
          {...register("destino", { required: "El destino es obligatorio" })} 
        />
        {errors.destino && <span className="error-message">{errors.destino.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="horario">Fecha y Hora</label>
        <input 
          type="datetime-local" 
          id="horario" 
          {...register("horario", { required: "El horario es obligatorio" })} 
        />
        {errors.horario && <span className="error-message">{errors.horario.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="cupos_disponibles">Cupos Disponibles</label>
        <input 
          type="number" 
          id="cupos_disponibles" 
          {...register("cupos_disponibles", { required: "Los cupos son obligatorios", min: { value: 1, message: "Debe haber al menos 1 cupo" } })} 
        />
        {errors.cupos_disponibles && <span className="error-message">{errors.cupos_disponibles.message}</span>}
      </div>

      <button type="submit">Registrar Acompañamiento</button>
    </form>
  );
}

export default AcompanamientoForm;