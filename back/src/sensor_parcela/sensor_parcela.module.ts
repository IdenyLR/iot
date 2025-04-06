import { Module } from '@nestjs/common';
import { SensorParcelaService } from './sensor_parcela.service';
import { SensorParcelaController } from './sensor_parcela.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SensorParcelaController],
  providers: [SensorParcelaService],
})
export class SensorParcelaModule {}
