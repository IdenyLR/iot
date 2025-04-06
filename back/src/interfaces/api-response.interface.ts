export interface ApiResponse {
    sensores: {
      humedad: number;
      temperatura: number;
      lluvia: number;
      sol: number;
    };
    parcelas: ParcelaApi[];
  }
  
  export interface ParcelaApi {
    id: number;
    nombre: string;
    ubicacion: string;
    responsable: string;
    tipo_cultivo: string;
    ultimo_riego: string;
    latitud: number;
    longitud: number;
    sensor: {
      humedad: number;
      temperatura: number;
      lluvia: number;
      sol: number;
    };
  }
  