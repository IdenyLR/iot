export class CreateParcelaDto {
    nombre: string;
    ubicacion: string;
    responsable: string;
    tipo_cultivo: string;
    ultimo_riego: Date;
    latitud: string;
    longitud: string;
    activo?: boolean;
  }
  