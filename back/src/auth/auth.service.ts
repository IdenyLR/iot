import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUsuarioDto, SecurityAnswerDto } from './dto/auth-usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, 
  ) {}

  // Obtener la pregunta de seguridad
  async obtenerPreguntaSeguridad(correo: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
      select: { pregunta: true },
    });

    if (!usuario) {
      throw new UnauthorizedException('Correo no encontrado');
    }

    return { pregunta: usuario.pregunta };
  }

  // Validar usuario (solo correo y contraseña)
  async validateUser(dto: AuthUsuarioDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: dto.correo },
    });

    if (!usuario) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const passwordValid = await bcrypt.compare(dto.contra, usuario.contra);
    if (!passwordValid) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // Retornar solo si la contraseña es válida, la validación de seguridad es otro paso
    return { message: 'Contraseña correcta', pregunta: usuario.pregunta };
  }

  // Validar x de seguridad
  async validateSecurityAnswer(dto: SecurityAnswerDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: dto.correo },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const respuestaValid = await bcrypt.compare(dto.respuesta, usuario.respuesta);
    if (!respuestaValid) {
      throw new UnauthorizedException('Respuesta de seguridad incorrecta');
    }

    // Generar token JWT después de validar la respuesta
    const token = this.jwtService.sign({ id: usuario.id, correo: usuario.correo });

    return {
      message: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre,
      },
      token,
    };
  }
}
