// interfaces/SensorData.ts
export interface ApiResponse {
  sensores: Sensores;
  parcelas: Parcela[];
}

export interface Sensores {
  humedad: number;
  temperatura: number;
  lluvia: number;
  sol: number;
  fecha_registro: string;
}

export interface Parcela {
  id: number;
  nombre: string;
  ubicacion: string;
  responsable: string;
  tipo_cultivo: string;
  ultimo_riego: string;
  latitud: string;
  longitud: string;
  activo: boolean;
  sensorParcelas?: SensorParcela[];
}

export interface SensorParcela {
  id: number;
  humedad: number;
  temperatura: number;
  lluvia: number;
  sol: number;
  fecha_registro: string;
  parcelaId: number;
}
