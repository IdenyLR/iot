import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRETO_SUPER_SEGURO', 
    });
  }

  async validate(payload: { correo: string }) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo: payload.correo },
    });

    if (!usuario) {
      throw new UnauthorizedException('Token inválido');
    }

    return usuario;
  }
}
