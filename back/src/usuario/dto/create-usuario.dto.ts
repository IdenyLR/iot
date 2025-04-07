import { IsEmail, IsOptional, IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'El correo debe ser un correo válido' })
  correo: string;

  @IsOptional()
  @Matches(/^\+?[0-9]{8,15}$/, { message: 'El teléfono debe contener entre 8 y 15 dígitos, y puede incluir un prefijo +' })
  telefono?: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres' }) 
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'La contraseña debe tener al menos una mayúscula, un número y un símbolo.',
  })
  contra: string;

  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
  nombre?: string;

  @IsNotEmpty({ message: 'La pregunta de seguridad no puede estar vacía' })
  @IsString({ message: 'La pregunta debe ser una cadena de texto' })
  @Length(5, 100, { message: 'La pregunta de seguridad debe tener entre 5 y 100 caracteres' })
  pregunta: string;

  @IsNotEmpty({ message: 'La respuesta de seguridad no puede estar vacía' })
  @IsString({ message: 'La respuesta debe ser una cadena de texto' })
  @Length(4, 100, { message: 'La respuesta de seguridad debe tener entre 4 y 100 caracteres' })
  respuesta: string;
}

