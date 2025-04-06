import React from 'react';
import { Link } from 'react-router-dom';
import FormLogin from '../../components/UI/Login/FormLogin';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <FormLogin />
        <div className="register-link">
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
