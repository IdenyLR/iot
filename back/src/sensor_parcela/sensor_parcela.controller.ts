import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SensorParcelaService } from './sensor_parcela.service';
import { CreateSensorParcelaDto } from './dto/create-sensor_parcela.dto';

@Controller('sensor-parcela')
export class SensorParcelaController {
  constructor(private readonly service: SensorParcelaService) {}

  @Post()
  create(@Body() dto: CreateSensorParcelaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('parcela/:parcelaId')
  findByParcela(@Param('parcelaId') parcelaId: string) {
    return this.service.findByParcelaId(+parcelaId);
  }

  @Get('parcela/:parcelaId/latest')
  findLatestByParcela(@Param('parcelaId') parcelaId: string) {
    return this.service.findLatestByParcelaId(+parcelaId);
  }
}
