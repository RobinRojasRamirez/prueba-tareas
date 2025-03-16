import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common'
import { TareasService } from '../services/tareas.service'
import { PagableTareasDto } from '../dtos/pagable-tareas.dto'
import { CreateTareaDto } from '../dtos/create-tareas.dto'
/**
 * Controlador para gestionar las conexiones a bases de datos.
 */
@Controller('tareas')
export class TareasController {
  constructor(private readonly _tareasService: TareasService) {}

  /**
   * Crea una nueva conexión en el sistema.
   * Retorna la información de la conexión creada.
   *
   * @param dto - Datos de la conexión a crear
   * @returns Objeto con los detalles de la conexión creada
   */
  @Post('create')
  async createTareas(@Body() dto: CreateTareaDto) {
    try {
      const connection = await this._tareasService.createTarea(dto)
      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        message: 'Conexión creada exitosamente.',
        data: connection,
      }
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al crear la conexión.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Put(':id')
  async updateTarea(@Param('id') id: string, @Body() data: CreateTareaDto) {
    try {
      const tareaActualizada = await this._tareasService.updateTarea(id, data);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Tarea actualizada exitosamente.',
        data: tareaActualizada,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al actualizar la tarea.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Post('pagable')
  async listaTareasPagable(@Body() dto: PagableTareasDto<null>) {
    try {
      const tareas =
        await this._tareasService.listTareasPagable(dto)
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Tareas obtenidas exitosamente.',
        data: tareas,
      }
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al obtener las tareas.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('find-by-id/:id')
  async findTareaById(@Param('id') id: string) {
    try {
      const tarea = await this._tareasService.getTareaById(id)
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Tarea obtenida exitosamente.',
        data: tarea,
      }
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al obtener la tarea.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Delete('delete/:id')
  async deleteConnection(@Param('id') id: string) {
    try {
      await this._tareasService.deleteTareaById(id)
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Tarea eliminada exitosamente.',
      }
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al eliminar la tarea.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('pendientes')
  async getPendientes() {
    try {
      const tareasPendientes = await this._tareasService.getTareasPendientes()
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Tarea obtenida exitosamente.',
        data: tareasPendientes,
      }
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al obtener la tarea.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Get('completadas')
  async getCompletadas() {
    try {
      const tareasCompletadas = await this._tareasService.getTareasCompletadas()
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Tarea obtenida exitosamente.',
        data: tareasCompletadas,
      }
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Error al obtener la tarea.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

}
