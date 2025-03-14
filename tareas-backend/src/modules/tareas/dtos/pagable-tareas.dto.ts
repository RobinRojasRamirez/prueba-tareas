import { IsInt, IsOptional, IsString, Min, IsIn } from 'class-validator'

export class PagableTareasDto<T> {
  @IsInt({ message: 'La página debe ser un número entero válido.' })
  @Min(0, { message: 'La página debe ser al menos 1.' })
  page: number

  @IsInt({ message: 'La cantidad de filas debe ser un número entero válido.' })
  @Min(1, { message: 'La cantidad de filas debe ser al menos 1.' })
  row: number

  @IsString({
    message: 'El campo de búsqueda debe ser una cadena de texto válida.',
  })
  search: string

  @IsString({ message: 'El orden debe ser una cadena de texto válida.' })
  @IsIn(['ASC', 'DESC'], { message: 'El orden debe ser ASC o DESC.' })
  order: string

  @IsString({
    message: 'El campo de ordenamiento debe ser una cadena de texto válida.',
  })
  order_by: string

  @IsOptional()
  params?: T
}
