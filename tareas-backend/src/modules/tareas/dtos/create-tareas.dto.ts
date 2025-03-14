import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator'

export class CreateTareaDto {
 
  @IsString({ message: 'El titulo debe ser una cadena de texto válida.' })
  @IsNotEmpty({ message: 'El titulo es obligatorio.' })
  titulo: string

  @IsString({ message: 'la descripcion debe ser una cadena de texto válido.' })
  @IsNotEmpty({ message: 'La descripcion es obligatoria.' })
  descripcion: string

  @IsInt({ message: 'El estado debe ser un número entero válido.' })
  @IsNotEmpty({ message: 'El estado es obligatorio.' })
  estado: number;

}
