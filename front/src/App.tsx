// src/App.tsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Graficos from './pages/Graficos/Graficos';
import ParcelasEliminadas from './pages/ParcelasEliminadas/ParcelasEliminadas';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/graficos" element={<Graficos />} />
          <Route path="/eliminadas" element={<ParcelasEliminadas />} />
        </Route>

        {/* Ruta de fallback (opcional) */}
        <Route path="*" element={<Link to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;