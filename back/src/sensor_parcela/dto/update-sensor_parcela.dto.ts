import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorParcelaDto } from './create-sensor_parcela.dto';

export class UpdateSensorParcelaDto extends PartialType(CreateSensorParcelaDto) {}
