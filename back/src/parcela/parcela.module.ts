import { Module } from '@nestjs/common';
import { ParcelaService } from './parcela.service';
import { ParcelaController } from './parcela.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ParcelaController],
  providers: [ParcelaService],
})
export class ParcelaModule {}
