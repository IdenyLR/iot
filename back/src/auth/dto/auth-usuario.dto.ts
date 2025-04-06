import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthUsuarioDto {
  @IsEmail({}, { message: 'El correo debe ser válido' })
  correo: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  contra: string;
}

export class SecurityAnswerDto {
  @IsEmail({}, { message: 'El correo debe ser válido' })
  correo: string;

  @IsNotEmpty({ message: 'La respuesta de seguridad no puede estar vacía' })
  @Length(5, 100, { message: 'La respuesta de seguridad debe tener entre 5 y 100 caracteres' })
  respuesta: string;
}
