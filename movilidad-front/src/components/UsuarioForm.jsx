import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// No necesitamos importar estilos ni definir objetos de estilo aquí.
// Todo el diseño vendrá del archivo index.css a través de las "className".

function UsuarioForm({ onSubmit, usuarioAEditar }) {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  // Esta lógica para llenar o limpiar el formulario se mantiene igual.
  useEffect(() => {
    if (usuarioAEditar) {
      setValue('nombre', usuarioAEditar.nombre);
      setValue('correo', usuarioAEditar.correo);
    } else {
      reset({
        nombre: '',
        correo: '',
        cedula: '',
        contraseña: ''
      });
    }
  }, [usuarioAEditar, setValue, reset]);

  return (
    // Aplicamos la clase principal al formulario.
    <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
      <h2>{usuarioAEditar ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>

      {/* --- Grupo de Input: Nombre --- */}
      <div className="input-group">
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          type="text"
          id="nombre"
          {...register("nombre", { required: "El nombre es obligatorio" })}
        />
        {/* Aquí puedes añadir un span para mostrar el mensaje de error si quieres */}
        {errors.nombre && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.nombre.message}</span>}
      </div>

      {/* --- Grupo de Input: Correo --- */}
      <div className="input-group">
        <label htmlFor="correo">Correo Electrónico</label>
        <input
          type="email"
          id="correo"
          {...register("correo", { required: "El correo es obligatorio" })}
        />
        {errors.correo && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.correo.message}</span>}
      </div>

      {/* --- Grupo de Input: Cédula --- */}
      <div className="input-group">
        <label htmlFor="cedula">Cédula</label>
        <input
          type="text"
          id="cedula"
          {...register("cedula", { required: !usuarioAEditar })}
          disabled={!!usuarioAEditar}
        />
        {errors.cedula && <span style={{ color: 'red', fontSize: '0.8rem' }}>La cédula es obligatoria</span>}
      </div>

      {/* --- Grupo de Input: Contraseña --- */}
      <div className="input-group">
        <label htmlFor="contraseña">Contraseña</label>
        <input
          type="password"
          id="contraseña"
          {...register("contraseña", { required: !usuarioAEditar })}
          disabled={!!usuarioAEditar}
        />
        {errors.contraseña && <span style={{ color: 'red', fontSize: '0.8rem' }}>La contraseña es obligatoria</span>}
      </div>

      {/* El botón ya tomará los estilos definidos en index.css para 'button' dentro de '.modern-form' */}
      <button type="submit">
        {usuarioAEditar ? 'Actualizar Usuario' : 'Crear Usuario'}
      </button>
    </form>
  );
}

export default UsuarioForm;