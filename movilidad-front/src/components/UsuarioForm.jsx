import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// Ya no importamos axios aquí, porque el padre se encarga de eso.

// 1. Recibimos la función onSubmit y el usuario a editar como "props"
function UsuarioForm({ onSubmit, usuarioAEditar }) {
    // 2. De useForm, ahora también usamos "setValue" y "reset"
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    // 3. useEffect se ejecutará cada vez que "usuarioAEditar" cambie.
    useEffect(() => {
        if (usuarioAEditar) {
            // Si hay un usuario para editar, llenamos el formulario con sus datos.
            setValue('nombre', usuarioAEditar.nombre);
            setValue('correo', usuarioAEditar.correo);
            // Nota: No llenamos cédula ni contraseña por seguridad y porque el backend no los actualiza.
        } else {
            // Si no estamos editando (es decir, creamos o terminamos de editar), limpiamos el formulario.
            reset();
        }
    }, [usuarioAEditar, setValue, reset]);

    return (
        // 4. El onSubmit ahora llama a la función "handleSubmit" que nos pasó el padre.
        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
            {/* 5. El título cambia dependiendo de si estamos editando o no */}
            <h2>{usuarioAEditar ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>

            <div style={inputGroupStyle}>
                <label htmlFor="nombre">Nombre Completo</label>
                <input type="text" id="nombre" {...register("nombre", { required: true })} style={inputStyle} />
                {errors.nombre && <span style={errorStyle}>Este campo es requerido</span>}
            </div>

            <div style={inputGroupStyle}>
                <label htmlFor="correo">Correo Electrónico</label>
                <input type="email" id="correo" {...register("correo", { required: true })} style={inputStyle} />
                {errors.correo && <span style={errorStyle}>Este campo es requerido</span>}
            </div>

            {/* 6. Deshabilitamos los campos de cédula y contraseña si estamos editando */}
            <div style={inputGroupStyle}>
                <label htmlFor="cedula">Cédula</label>
                <input type="text" id="cedula" {...register("cedula", { required: !usuarioAEditar })} style={inputStyle} disabled={!!usuarioAEditar} />
                {errors.cedula && <span style={errorStyle}>Este campo es requerido</span>}
            </div>

            <div style={inputGroupStyle}>
                <label htmlFor="contraseña">Contraseña</label>
                <input type="password" id="contraseña" {...register("contraseña", { required: !usuarioAEditar })} style={inputStyle} disabled={!!usuarioAEditar} />
                {errors.contraseña && <span style={errorStyle}>Este campo es requerido</span>}
            </div>

            {/* 7. El texto del botón también cambia */}
            <button type="submit" style={buttonStyle}>
                {usuarioAEditar ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
        </form>
    );
}

// ... (toda la lógica del componente UsuarioForm va aquí arriba) ...

// Estilos del formulario
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

export default UsuarioForm;