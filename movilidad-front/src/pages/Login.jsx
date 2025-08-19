import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', data);
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      alert('¡Inicio de sesión exitoso!');

      navigate('/viajes');

    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert(error.response?.data?.mensaje || 'Correo o contraseña incorrectos.');
    }
  };


  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      
      {/* Usamos 'modern-form' para que tome nuestro diseño de index.css */}
      <form onSubmit={handleSubmit(onSubmit)} className="modern-form">
        <h2>Inicio de Sesión</h2>

        <div className="input-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            {...register("correo", { required: "El correo es obligatorio" })}
          />
          {errors.correo && <span className="error-message">{errors.correo.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            {...register("contraseña", { required: "La contraseña es obligatoria" })}
          />
          {errors.contraseña && <span className="error-message">{errors.contraseña.message}</span>}
        </div>

        <button type="submit">Ingresar</button>
      </form>

    </div>
  );
}


export default Login;