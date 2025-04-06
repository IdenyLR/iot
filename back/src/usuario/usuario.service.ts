import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  // Empieza función para crear usuario
  async create(createUsuarioDto: CreateUsuarioDto) {
    const { correo, contra, telefono, nombre, pregunta, respuesta } = createUsuarioDto;
  
    // Verificar si el usuario ya existe
    const usuarioExistente = await this.prisma.usuario.findUnique({ where: { correo } });
    if (usuarioExistente) {
      throw new BadRequestException('El correo ya está registrado.');
    }
  
    // Encriptar la contraseña y la respuesta de seguridad antes de guardarlas
    const hashedPassword = await bcrypt.hash(contra, 10);
    const hashedRespuesta = await bcrypt.hash(respuesta, 10);
  
    try {
      return await this.prisma.usuario.create({
        data: {
          correo,
          contra: hashedPassword,
          telefono: telefono || '',
          nombre: nombre || '',
          pregunta,
          respuesta: hashedRespuesta, // Guardamos la respuesta encriptada
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('El correo ya está en uso.');
      }
      throw new BadRequestException('Error al crear el usuario.');
    }
  }
   // Termina validación de usuario existente
  // Termina función para crear usuario

  // función para obtener todos los usuarios
  async findAll() {
    return this.prisma.usuario.findMany();
  }

  // función para obtener un usuario por ID
  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  // función para actualizar un usuario
  async update(id: number, updateUsuarioDto: Partial<CreateUsuarioDto>) {
    try {
      return await this.prisma.usuario.update({
        where: { id },
        data: {
          ...updateUsuarioDto,
          telefono: updateUsuarioDto.telefono || '',
          nombre: updateUsuarioDto.nombre || '',
        },
      });
    } catch (error) {
      throw new BadRequestException('Error al actualizar usuario.');
    }
  }

 // función para eliminar un usuario
  async delete(id: number) {
    try {
      return await this.prisma.usuario.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('No se pudo eliminar, usuario no encontrado.');
    }
  }
}
