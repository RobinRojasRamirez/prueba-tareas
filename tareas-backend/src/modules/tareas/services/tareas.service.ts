import { Injectable, NotFoundException } from '@nestjs/common'
import { PagableTareasDto } from '../dtos/pagable-tareas.dto';
import { Tarea } from 'src/models/entities/tarea.entity';
import { TareasRepository } from './tareas.repository';
import { CreateTareaDto } from '../dtos/create-tareas.dto';

/**
 * Servicio para la gestión de conexiones a bases de datos.
 *
 * Proporciona métodos para la creación, consulta, actualización
 * y eliminación lógica de conexiones.
 */
@Injectable()
export class TareasService {
  constructor(private readonly _tareasRepository: TareasRepository) {}

  /**
   * Crea una nueva conexión a la base de datos.
   * Si se proporciona un EntityManager, se utilizará para ejecutar la transacción.
   *
   * @param data - Datos necesarios para la nueva conexión
   * @returns La conexión creada
   */


  async createTarea(data: CreateTareaDto): Promise<Tarea> {
    return await this._tareasRepository.createTarea(data);
  }

  async updateTarea(id: string, data: CreateTareaDto): Promise<Tarea> {
    return await this._tareasRepository.updateTarea(id, data);
  }

  async listConnectionsPagable(
    pagableConnectionDto: PagableTareasDto<null>
  ): Promise<{ content: Tarea[]; totalElements: number }> {
    return await this._tareasRepository.listTareasPagable(
      pagableConnectionDto
    )
  }

  async getTareaById(id: string): Promise<Tarea> {
    const tarea = await this._tareasRepository.findOneById(id);
    if ( !tarea ) {
      throw new NotFoundException(`No se encontró la tarea con el ID: ${id}`);
    }
    return tarea;
  }

  async deleteTareaById(id: string): Promise<void> {
    const tarea = await this._tareasRepository.findOneById(id);
    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada.');
    }
    await this._tareasRepository.deleteTarea(id);
  }

  async getTareasPendientes(): Promise<Tarea[]> {
    return await this._tareasRepository.tareasPendientes();
  }

  async getTareasCompletadas(): Promise<Tarea[]> {
    return await this._tareasRepository.tareasCompletadas();
  }

}
