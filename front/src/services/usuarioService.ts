import { Usuario } from '../interfaces/usuarioInterface';
import axios from 'axios';
import api from '../config/api'; 

export const registerUser = async (usuario: Usuario) => {
  try {
    const response = await api.post('/usuarios', usuario); // Usando la instancia de Axios
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw 'Error al registrar el usuario';
  }
};
export const getSecurityQuestion = async (email: string) => {
  try {
    const response = await api.post('/auth/pregunta-seguridad', { correo: email });
    return response.data.pregunta;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw 'Error al obtener la pregunta de seguridad';
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { correo: email, contra: password });
    return response.data; 
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw 'Error al iniciar sesión';
  }
};

export const verifySecurityAnswer = async (email: string, answer: string) => {
  try {
    const response = await api.post('/auth/verificar-respuesta', { correo: email, respuesta: answer });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw 'Error al verificar la respuesta de seguridad';
  }
};
