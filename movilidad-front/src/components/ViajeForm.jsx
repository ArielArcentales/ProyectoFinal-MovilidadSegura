import React from 'react';
import { useForm } from 'react-hook-form';

// 1. Recibimos como props las listas de clientes y conductores, y la función onSubmit
function ViajeForm({ clientes, conductores, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2>Registrar Nuevo Viaje</h2>

      {/* Menú desplegable para el Cliente */}
      <div style={inputGroupStyle}>
        <label htmlFor="id_cliente">Cliente</label>
        <select id="id_cliente" {...register("id_cliente", { required: true })} style={inputStyle}>
          <option value="">Seleccione un cliente...</option>
          {/* 2. Usamos .map() para crear una opción por cada cliente */}
          {clientes.map(cliente => (
            <option key={cliente.id_usuario} value={cliente.id_usuario}>
              {cliente.nombre}
            </option>
          ))}
        </select>
        {errors.id_cliente && <span style={errorStyle}>Debe seleccionar un cliente</span>}
      </div>

      {/* Menú desplegable para el Conductor */}
      <div style={inputGroupStyle}>
        <label htmlFor="id_conductor">Conductor</label>
        <select id="id_conductor" {...register("id_conductor", { required: true })} style={inputStyle}>
          <option value="">Seleccione un conductor...</option>
          {conductores.map(conductor => (
            <option key={conductor.id_conductor} value={conductor.id_conductor}>
              {conductor.nombre}
            </option>
          ))}
        </select>
        {errors.id_conductor && <span style={errorStyle}>Debe seleccionar un conductor</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="punto_origen">Punto de Origen</label>
        <input type="text" id="punto_origen" {...register("punto_origen", { required: true })} style={inputStyle} />
        {errors.punto_origen && <span style={errorStyle}>Este campo es requerido</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="punto_destino">Punto de Destino</label>
        <input type="text" id="punto_destino" {...register("punto_destino", { required: true })} style={inputStyle} />
        {errors.punto_destino && <span style={errorStyle}>Este campo es requerido</span>}
      </div>

      <div style={inputGroupStyle}>
        <label htmlFor="fecha">Fecha y Hora</label>
        <input type="datetime-local" id="fecha" {...register("fecha", { required: true })} style={inputStyle} />
        {errors.fecha && <span style={errorStyle}>Este campo es requerido</span>}
      </div>

      <button type="submit" style={buttonStyle}>Registrar Viaje</button>
    </form>
  );
}

// Estilos
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px', // Un ancho máximo para que no se estire demasiado
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

export default ViajeForm;