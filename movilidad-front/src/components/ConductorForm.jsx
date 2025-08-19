import React from 'react';
import { useForm } from 'react-hook-form'; // 1. Importamos el hook
import axios from 'axios'; // 2. Importamos axios

function ConductorForm() {
  // 3. Activamos useForm para manejar el estado y la validación
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 4. Esta es la función que se ejecuta al enviar un formulario válido
  const onSubmit = async (data) => {
    try {
      // El backend espera un número para la calificación, lo convertimos
      const dataToSend = {
        ...data,
        calificacion: parseFloat(data.calificacion)
      };

      console.log('Enviando datos de nuevo conductor:', dataToSend);

      // 5. Usamos axios para hacer la petición POST a la API de conductores
      const response = await axios.post('/api/conductores', dataToSend);

      console.log('Respuesta del servidor:', response.data);
      alert('¡Conductor registrado con éxito!');
      // Aquí podríamos limpiar el formulario si quisiéramos

    } catch (error) {
      console.error('Error al registrar al conductor:', error.response?.data?.mensaje || error.message);
      alert(`Error: ${error.response?.data?.mensaje || 'No se pudo conectar al servidor'}`);
    }
  };

  return (
    // 6. Conectamos la función onSubmit a través de handleSubmit
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2>Registrar Nuevo Conductor</h2>
      
      <div style={inputGroupStyle}>
        <label htmlFor="nombre">Nombre Completo</label>
        {/* 7. Vinculamos el input al hook con sus reglas de validación */}
        <input 
          type="text" 
          id="nombre" 
          {...register("nombre", { required: "El nombre es obligatorio" })} 
          style={inputStyle} 
        />
        {errors.nombre && <p style={errorStyle}>{errors.nombre.message}</p>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="cedula">Cédula</label>
        <input 
          type="text" 
          id="cedula" 
          {...register("cedula", { required: "La cédula es obligatoria" })} 
          style={inputStyle} 
        />
        {errors.cedula && <p style={errorStyle}>{errors.cedula.message}</p>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="calificacion">Calificación (0.0 - 5.0)</label>
        <input 
          type="number" 
          id="calificacion" 
          {...register("calificacion", { 
            required: "La calificación es obligatoria",
            min: { value: 0, message: "La calificación no puede ser menor a 0" },
            max: { value: 5, message: "La calificación no puede ser mayor a 5" }
          })} 
          step="0.1"
          min="0" 
          max="5" 
          style={inputStyle} 
        />
        {errors.calificacion && <p style={errorStyle}>{errors.calificacion.message}</p>}
      </div>

      <button type="submit" style={buttonStyle}>Registrar Conductor</button>
    </form>
  );
}

// Estilos (se añade errorStyle)
const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '2rem auto', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const inputGroupStyle = { marginBottom: '1rem', display: 'flex', flexDirection: 'column' };
const inputStyle = { padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' };
const buttonStyle = { padding: '1rem', borderRadius: '4px', border: 'none', background: '#004080', color: 'white', fontSize: '1rem', cursor: 'pointer' };
const errorStyle = { color: 'red', fontSize: '0.8rem', marginTop: '0.25rem' };

export default ConductorForm;