import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator'

export class UpdateConnectionDto {
  /**
   * Identificador único (UUID) autogenerado para cada conexión.
   */
  @IsString({ message: 'El id debe ser una cadena de texto válida.' })
  @IsNotEmpty({ message: 'El id es obligatorio.' })
  id: string

  /**
   * Nombre de la conexión.
   */
  @IsString({ message: 'El nombre debe ser una cadena de texto válido.' })
  @IsOptional()
  name: string

  /**
   * Indica si la conexión está activa.
   */
  @IsOptional()
  @IsBoolean({ message: 'El campo isActive debe ser un booleano.' })
  isActive: boolean

  /**
   * Dirección del servidor.
   * Campo obligatorio.
   */
  @IsString({ message: 'El host debe ser una cadena de texto válida.' })
  @IsOptional()
  host: string

  /**
   * Tipo de base de datos.
   * Campo obligatorio.
   */
  @IsString({
    message: 'El tipo de base de datos debe ser una cadena de texto válida.',
  })
  @IsOptional()
  type: string

  /**
   * Contraseña del usuario.
   * Se recomienda encriptarla antes de almacenar.
   */
  @IsString({ message: 'La contraseña debe ser una cadena de texto válida.' })
  @IsOptional()
  password: string

  /**
   * Nombre de usuario.
   * Campo obligatorio.
   */
  @IsString({
    message: 'El nombre de usuario debe ser una cadena de texto válida.',
  })
  @IsOptional()
  user: string

  /**
   * Nombre de la base de datos.
   * Campo obligatorio.
   */
  @IsString({
    message:
      'El nombre de la base de datos debe ser una cadena de texto válida.',
  })
  @IsOptional()
  database: string

  /**
   * Puerto de conexión al servidor.
   * Campo obligatorio.
   */
  @IsInt({ message: 'El puerto debe ser un número entero válido.' })
  @IsOptional()
  port: number
}
