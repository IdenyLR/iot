// services/sensorService.ts  
import api from '../config/api';
import { ApiResponse, Parcela, Sensores } from '../interfaces/SensorData';

export const obtenerDatosSensores = async (): Promise<ApiResponse> => {
  const { data: sensores } = await api.get<Sensores>('/sensor/latest');
  const { data: parcelas } = await api.get<Parcela[]>('/parcela');

  return {
    sensores,
    parcelas: parcelas.filter(parcela => parcela.activo),
  };
};

export const obtenerParcelasInactivas = async (): Promise<Parcela[]> => {
  const { data } = await api.get<Parcela[]>('/parcela/inactivas');
  return data;
};

export const obtenerHistoricoSensores = async (): Promise<Sensores[]> => {
  const { data } = await api.get<Sensores[]>('/sensor');
  return data;
};

