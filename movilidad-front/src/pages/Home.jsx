import React from 'react';
import heroImage from '../assets/images/movilidad-segura.jpg'; 
import { useNavigate } from 'react-router-dom';

function Home() {
  // Inicializa el hook
  const navigate = useNavigate();

  const handleNavigateToUsers = () => {
    // Destino a '/usuarios'
    navigate('/usuarios'); 
  };

  return (
    <div>

      <div style={heroStyle(heroImage)}>
        <div style={heroOverlayStyle}>
          <div style={heroContentStyle}>
            <h1 style={heroTitleStyle}>Movilidad Segura: Conectando a tu Comunidad</h1>
            <p style={heroSubtitleStyle}>
              Viaja acompañado, llega seguro. Publica tu ruta o únete a la de un compañero de confianza.
            </p>
            <button onClick={handleNavigateToUsers} style={heroButtonStyle}>
              ¡Empezar ahora!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


const heroStyle = (image) => ({
  height: '90vh',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  color: 'white',
});

const heroOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const heroContentStyle = {
  textAlign: 'center',
  maxWidth: '800px',
  padding: '0 2rem',
};

const heroTitleStyle = {
  fontSize: '3.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
};

const heroSubtitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '2rem',
};

const heroButtonStyle = {
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  backgroundColor: '#004080',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  textTransform: 'uppercase',
};

export default Home;