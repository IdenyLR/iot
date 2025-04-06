import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSensorDto } from './dto/create-sensor.dto';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSensorDto) {
    return this.prisma.sensor.create({ data: dto });
  }

  findAll() {
    return this.prisma.sensor.findMany({ orderBy: { fecha_registro: 'desc' } });
  }

  findLatest() {
    return this.prisma.sensor.findFirst({ orderBy: { fecha_registro: 'desc' } });
  }
}

