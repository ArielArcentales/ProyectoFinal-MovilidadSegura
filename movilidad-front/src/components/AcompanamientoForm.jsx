import React from 'react';

function AcompanamientoForm() {
  // La lógica para manejar el formulario irá aquí más adelante
  const onSubmit = (data) => {
    console.log(data); // Por ahora, solo mostraremos los datos en consola
  };

  return (
    <form /* onSubmit={handleSubmit(onSubmit)} */ style={formStyle}>
      <h2>Registrar Nuevo Acompañamiento</h2>
      
      {/* Nota: Este campo 'id_usuario' será automático cuando tengamos login */}
      <div style={inputGroupStyle}>
        <label htmlFor="id_usuario">ID del Usuario (Temporal)</label>
        <input type="number" id="id_usuario" /* {...register("id_usuario")} */ style={inputStyle} />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="tipo_movilidad">Tipo de Movilidad (Ej: Vehículo, A pie)</label>
        <input type="text" id="tipo_movilidad" /* {...register("tipo_movilidad")} */ style={inputStyle} />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="punto_salida">Punto de Salida</label>
        <input type="text" id="punto_salida" /* {...register("punto_salida")} */ style={inputStyle} />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="destino">Destino</label>
        <input type="text" id="destino" /* {...register("destino")} */ style={inputStyle} />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="horario">Fecha y Hora</label>
        <input type="datetime-local" id="horario" /* {...register("horario")} */ style={inputStyle} />
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="cupos_disponibles">Cupos Disponibles</label>
        <input type="number" id="cupos_disponibles" /* {...register("cupos_disponibles")} */ style={inputStyle} />
      </div>

      <button type="submit" style={buttonStyle}>Registrar Acompañamiento</button>
    </form>
  );
}

// Estilos básicos para el formulario (puedes personalizarlos)
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

const buttonStyle = {
  padding: '1rem',
  borderRadius: '4px',
  border: 'none',
  background: '#004080',
  color: 'white',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default AcompanamientoForm;