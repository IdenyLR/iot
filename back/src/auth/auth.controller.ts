import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUsuarioDto, SecurityAnswerDto } from './dto/auth-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Obtener pregunta de seguridad por correo
  @Post('pregunta-seguridad')
  async obtenerPreguntaSeguridad(@Body('correo') correo: string) {
    try {
      return await this.authService.obtenerPreguntaSeguridad(correo);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Validar solo correo y contraseña
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() authUsuarioDto: AuthUsuarioDto) {
    try {
      return await this.authService.validateUser(authUsuarioDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  // Validar respuesta de seguridad
  @Post('verificar-respuesta')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async verificarRespuesta(@Body() securityAnswerDto: SecurityAnswerDto) {
    try {
      return await this.authService.validateSecurityAnswer(securityAnswerDto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
