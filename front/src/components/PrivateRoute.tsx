// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Verifica si hay un token en localStorage (o tu lógica de autenticación)
  const isAuthenticated = localStorage.getItem("token"); 

  // Si no está autenticado, redirige al login. Si sí, renderiza la ruta protegida.
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;