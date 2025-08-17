import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';
import Reportes from './pages/Reportes';
import Acompañamientos from './pages/Acompañamientos';
import Conductores from './pages/Conductores';
import Viajes from './pages/Viajes';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/acompanamientos" element={<Acompañamientos />} />
        <Route path="/conductores" element={<Conductores />} />
        <Route path="/viajes" element={<Viajes />} />
      </Routes>
    </>
  );
}

export default App;