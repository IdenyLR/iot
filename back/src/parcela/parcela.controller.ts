import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParcelaService } from './parcela.service';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';

@Controller('parcela')
export class ParcelaController {
  constructor(private readonly parcelaService: ParcelaService) {}

  @Post()
  create(@Body() createParcelaDto: CreateParcelaDto) {
    return this.parcelaService.create(createParcelaDto);
  }

  @Get()
  findAll() {
    return this.parcelaService.findAll();
  }

  @Get('/inactivas')
  findParcelasInactivas() {
    return this.parcelaService.findAllInactive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parcelaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParcelaDto: UpdateParcelaDto) {
    return this.parcelaService.update(+id, updateParcelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parcelaService.remove(+id);
  }
}
