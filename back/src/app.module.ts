import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from './sensor/sensor.module';
import { ParcelaModule } from './parcela/parcela.module';
import { SensorParcelaModule } from './sensor_parcela/sensor_parcela.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    SensorModule, 
    ParcelaModule, 
    SensorParcelaModule, 
    PrismaModule, 
    HttpModule,
    ScheduleModule.forRoot(),
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
