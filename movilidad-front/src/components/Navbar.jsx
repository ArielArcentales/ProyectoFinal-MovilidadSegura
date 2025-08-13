import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaClipboardList, FaCar, FaRoute, FaChartBar, FaSignInAlt } from 'react-icons/fa';

function Navbar() {
  return (
    <nav style={{
      background: '#004080',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      flexWrap: 'wrap'
    }}>
      <Link to="/" style={linkStyle}><FaHome size={20} /> Inicio</Link>
      <Link to="/usuarios" style={linkStyle}><FaUser size={20} /> Usuarios</Link>
      <Link to="/reportes" style={linkStyle}><FaClipboardList size={20} /> Reportes</Link>
      <Link to="/acompañamientos" style={linkStyle}><FaRoute size={20} /> Acompañamientos</Link>
      <Link to="/conductores" style={linkStyle}><FaCar size={20} /> Conductores</Link>
      <Link to="/viajes" style={linkStyle}><FaChartBar size={20} /> Viajes</Link>
      <Link to="/login" style={linkStyle}><FaSignInAlt size={20} /> Login</Link>
    </nav>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

export default Navbar;