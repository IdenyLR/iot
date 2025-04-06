import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSensorParcelaDto } from './dto/create-sensor_parcela.dto';

@Injectable()
export class SensorParcelaService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSensorParcelaDto) {
    return this.prisma.sensor_parcela.create({ data: dto });
  }

  findAll() {
    return this.prisma.sensor_parcela.findMany({ include: { parcela: true } });
  }

  findByParcelaId(parcelaId: number) {
    return this.prisma.sensor_parcela.findMany({
      where: { parcelaId },
      include: { parcela: true },
      orderBy: { fecha_registro: 'desc' },
    });
  }

  findLatestByParcelaId(parcelaId: number) {
    return this.prisma.sensor_parcela.findFirst({
      where: { parcelaId },
      include: { parcela: true },
      orderBy: { fecha_registro: 'desc' },
    });
  }
}

