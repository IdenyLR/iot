// app.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from './prisma/prisma.service';
import { ApiResponse, ParcelaApi } from './interfaces/api-response.interface';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly API_URL = 'https://moriahmkt.com/iotapp/updated/';

  constructor(
    private http: HttpService,
    private prisma: PrismaService,
  ) {}

  async fetchAndSaveData() {
    try {
      const { data } = await this.http.axiosRef.get<ApiResponse>(this.API_URL);
      
      await this.saveGeneralSensor(data.sensores);
      await this.updateParcelas(data.parcelas);

      this.logger.log('Datos obtenidos y guardados exitosamente.');

    } catch (error) {
      this.logger.error('Error obteniendo datos de API:', error);
    }
  }

  private async saveGeneralSensor(sensorData) {
    const latestSensor = await this.prisma.sensor.findFirst({
      orderBy: { fecha_registro: 'desc' },
    });
  
    if (
      !latestSensor ||
      latestSensor.temperatura !== sensorData.temperatura ||
      latestSensor.humedad !== sensorData.humedad ||
      latestSensor.lluvia !== sensorData.lluvia ||
      latestSensor.sol !== sensorData.sol
    ) {
      await this.prisma.sensor.create({
        data: { ...sensorData, fecha_registro: new Date() }, 
      });
    }
  }

  private async updateParcelas(parcelasApi: ParcelaApi[]) {
    const existingParcelas = await this.prisma.parcela.findMany({ where: { activo: true } });
    const parcelasApiIds = parcelasApi.map(p => p.id);
  
    for (const parcela of existingParcelas) {
      if (!parcelasApiIds.includes(parcela.id)) {
        await this.prisma.parcela.update({
          where: { id: parcela.id },
          data: { activo: false },
        });
      }
    }
  
    for (const parcelaApi of parcelasApi) {
      const parcelaData = {
        nombre: parcelaApi.nombre,
        ubicacion: parcelaApi.ubicacion,
        responsable: parcelaApi.responsable,
        tipo_cultivo: parcelaApi.tipo_cultivo,
        ultimo_riego: new Date(parcelaApi.ultimo_riego),
        latitud: parcelaApi.latitud.toString(),
        longitud: parcelaApi.longitud.toString(),
        activo: true,
      };
  
      await this.prisma.parcela.upsert({
        where: { id: parcelaApi.id },
        update: parcelaData,
        create: { id: parcelaApi.id, ...parcelaData },
      });
  
      await this.prisma.sensor_parcela.create({
        data: {
          humedad: parcelaApi.sensor.humedad,
          temperatura: parcelaApi.sensor.temperatura,
          lluvia: parcelaApi.sensor.lluvia,
          sol: parcelaApi.sensor.sol,
          fecha_registro: new Date(),
          parcelaId: parcelaApi.id,
        },
      });
    }
  }

  @Cron('*/1 * * * *')
  async handleCron() {
    await this.fetchAndSaveData();
  }
}
  