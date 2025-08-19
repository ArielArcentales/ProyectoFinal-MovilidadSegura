import React from 'react';
import { useForm } from 'react-hook-form';

function ViajeForm({ clientes, conductores, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
      <h2>Registrar Nuevo Viaje</h2>

      {/* Input Cliente */}
      <div className="input-group">
        <label htmlFor="id_cliente">Cliente</label>
        <select id="id_cliente" {...register("id_cliente", { required: true })}>
          <option value="">Seleccione un cliente...</option>
          {clientes.map(cliente => (
            <option key={cliente.id_usuario} value={cliente.id_usuario}>
              {cliente.nombre}
            </option>
          ))}
        </select>
        {errors.id_cliente && <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.4rem' }}>Debe seleccionar un cliente</div>}
      </div>

      {/* Input Conductor */}
      <div className="input-group">
        <label htmlFor="id_conductor">Conductor</label>
        <select id="id_conductor" {...register("id_conductor", { required: true })}>
          <option value="">Seleccione un conductor...</option>
          {conductores.map(conductor => (
            <option key={conductor.id_conductor} value={conductor.id_conductor}>
              {conductor.nombre}
            </option>
          ))}
        </select>
        {errors.id_conductor && <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.4rem' }}>Debe seleccionar un conductor</div>}
      </div>

      {/* Formulario */}
      <div className="input-group">
        <label htmlFor="punto_origen">Punto de Origen</label>
        <input type="text" id="punto_origen" {...register("punto_origen", { required: true })} />
      </div>

      <div className="input-group">
        <label htmlFor="punto_destino">Punto de Destino</label>
        <input type="text" id="punto_destino" {...register("punto_destino", { required: true })} />
      </div>

      <div className="input-group">
        <label htmlFor="fecha">Fecha y Hora</label>
        <input type="datetime-local" id="fecha" {...register("fecha", { required: true })} />
      </div>

      <button type="submit">Registrar Viaje</button>
    </form>
  );
}

export default ViajeForm;