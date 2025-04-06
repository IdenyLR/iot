import React from 'react';
import './Register.css';
import FormRegister from '../../components/UI/Register/FormRegister';

const Register: React.FC = () => {
  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h1>Crear Cuenta</h1>
        <FormRegister />
      </div>
    </div>
  );
};

export default Register;
