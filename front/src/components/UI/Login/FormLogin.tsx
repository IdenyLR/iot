import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSecurityQuestion, loginUser, verifySecurityAnswer } from '../../../services/usuarioService';
import Input from '../Input';
import './FormLogin.css';

const FormLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [securityQuestion, setSecurityQuestion] = useState<string | null>(null);
  const [securityAnswer, setSecurityAnswer] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (!securityQuestion) {
        await loginUser(email, password);
        const pregunta = await getSecurityQuestion(email);
        setSecurityQuestion(pregunta);
      } else {
        // Asume que verifySecurityAnswer devuelve un token
        const token = await verifySecurityAnswer(email, securityAnswer); 
        localStorage.setItem("token", token); // Guarda el token
        navigate('/dashboard'); // Redirige al dashboard
      }
    } catch (error: any) {
      setErrorMessage(
        typeof error === 'string' ? error : error?.message || 'Ocurrió un error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Iniciar Sesión</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {!securityQuestion ? (
        <>
          <div className="form-group">
            <Input label="Email:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <Input label="Contraseña:" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Siguiente'}
          </button>
        </>
      ) : (
        <>
          <p className="security-question"><strong>Pregunta de Seguridad:</strong> {securityQuestion}</p>
          <div className="form-group">
            <Input label="Respuesta:" type="text" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Verificar'}
          </button>
        </>
      )}
    </form>
  );
};

export default FormLogin;
