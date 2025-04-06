import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';

@Injectable()
export class ParcelaService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateParcelaDto) {
    return this.prisma.parcela.create({ data: dto });
  }

  findAll() {
    return this.prisma.parcela.findMany({ include: { sensorParcelas: true } });
  }

  findOne(id: number) {
    return this.prisma.parcela.findUnique({ where: { id }, include: { sensorParcelas: true } });
  }

  findAllInactive() {
    return this.prisma.parcela.findMany({ 
      where: { activo: false },
      include: { sensorParcelas: true },
    });
  }
  

  update(id: number, dto: UpdateParcelaDto) {
    return this.prisma.parcela.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.parcela.update({ where: { id }, data: { activo: false } });
  }
}
