import React from 'react';
import { useForm } from 'react-hook-form'; // 1. Importamos el hook
import axios from 'axios'; // 2. Importamos axios

function AcompanamientoForm() {
  // 3. Activamos useForm para manejar el estado y validación del formulario
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 4. Esta función se ejecuta cuando el formulario es válido y se envía
  const onSubmit = async (data) => {
    try {
      // Convertimos los campos numéricos al tipo correcto antes de enviar
      const dataToSend = {
        ...data,
        id_usuario: parseInt(data.id_usuario, 10),
        cupos_disponibles: parseInt(data.cupos_disponibles, 10)
      };

      console.log('Enviando datos:', dataToSend);

      // 5. Usamos axios para hacer la petición POST a la URL del backend
      // Asegúrate de que la URL sea la correcta para tu entorno
      const response = await axios.post('/api/acompanamientos', dataToSend);
      
      console.log('Respuesta del servidor:', response.data);
      alert('¡Acompañamiento registrado con éxito!');
      // Aquí podríamos limpiar el formulario o actualizar la lista de acompañamientos

    } catch (error) {
      console.error('Error al registrar el acompañamiento:', error.response?.data?.mensaje || error.message);
      alert(`Error: ${error.response?.data?.mensaje || 'No se pudo conectar al servidor'}`);
    }
  };

  return (
    // 6. Conectamos la función onSubmit a través de handleSubmit
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2>Registrar Nuevo Acompañamiento</h2>
      
      <div style={inputGroupStyle}>
        <label htmlFor="id_usuario">ID del Usuario (Temporal)</label>
        {/* 7. Conectamos cada input al hook con el método 'register' */}
        <input 
          type="number" 
          id="id_usuario" 
          {...register("id_usuario", { required: "El ID del usuario es obligatorio" })} 
          style={inputStyle} 
        />
        {errors.id_usuario && <p style={errorStyle}>{errors.id_usuario.message}</p>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="tipo_movilidad">Tipo de Movilidad</label>
        <select 
          id="tipo_movilidad" 
          {...register("tipo_movilidad", { required: "Debe seleccionar un tipo de movilidad" })} 
          style={inputStyle}
        >
          <option value="">-- Seleccione una opción --</option>
          <option value="Vehículo">Vehículo</option>
          <option value="A pie">A pie</option>
        </select>
        {errors.tipo_movilidad && <p style={errorStyle}>{errors.tipo_movilidad.message}</p>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="punto_salida">Punto de Salida</label>
        <input 
          type="text" 
          id="punto_salida" 
          {...register("punto_salida", { required: "El punto de salida es obligatorio" })} 
          style={inputStyle} 
        />
        {errors.punto_salida && <p style={errorStyle}>{errors.punto_salida.message}</p>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="destino">Destino</label>
        <input 
          type="text" 
          id="destino" 
          {...register("destino", { required: "El destino es obligatorio" })} 
          style={inputStyle} 
        />
        {errors.destino && <p style={errorStyle}>{errors.destino.message}</p>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="horario">Fecha y Hora</label>
        <input 
          type="datetime-local" 
          id="horario" 
          {...register("horario", { required: "El horario es obligatorio" })} 
          style={inputStyle} 
        />
        {errors.horario && <p style={errorStyle}>{errors.horario.message}</p>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="cupos_disponibles">Cupos Disponibles</label>
        <input 
          type="number" 
          id="cupos_disponibles" 
          {...register("cupos_disponibles", { required: "Los cupos son obligatorios", min: { value: 1, message: "Debe haber al menos 1 cupo" } })} 
          style={inputStyle} 
        />
        {errors.cupos_disponibles && <p style={errorStyle}>{errors.cupos_disponibles.message}</p>}
      </div>

      <button type="submit" style={buttonStyle}>Registrar Acompañamiento</button>
    </form>
  );
}


const formStyle = { 
    display: 'flex', 
    flexDirection: 'column', 
    maxWidth: '400px', 
    margin: '2rem auto', 
    padding: '2rem', 
    borderRadius: '8px', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
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

const buttonStyle = { padding: '1rem', 
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
    marginTop: '0.25rem' 
};

export default AcompanamientoForm;