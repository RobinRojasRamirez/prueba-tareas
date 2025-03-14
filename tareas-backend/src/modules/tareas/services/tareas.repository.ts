import { Injectable, NotFoundException } from '@nestjs/common'
import {  Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Tarea } from 'src/models/entities/tarea.entity'
import { PagableTareasDto } from '../dtos/pagable-tareas.dto';
import { CreateTareaDto } from '../dtos/create-tareas.dto';

@Injectable()
export class TareasRepository {

  constructor(
    @InjectRepository(Tarea)
    private readonly _tareasRepository: Repository<Tarea>,
  ) {}

  async createTarea(data: CreateTareaDto): Promise<Tarea> {
    const nuevaTarea = this._tareasRepository.create(data);
    return await this._tareasRepository.save(nuevaTarea);
  }

  async updateTarea(id: string, data: CreateTareaDto): Promise<Tarea> {
    const tarea = await this._tareasRepository.findOne({ where: { id } });
  
    if (!tarea) {
      throw new NotFoundException(`La tarea con ID ${id} no existe.`);
    }
  
    Object.assign(tarea, data);
    return await this._tareasRepository.save(tarea);
  }
  

  //Metodo para listar todas las conexiones paginadas
  async listTareasPagable(
    pagableTareasDto: PagableTareasDto<null>
  ): Promise<{ content: Tarea[]; totalElements: number }> {
    const { page, row, search, order, order_by, params } = pagableTareasDto
    // Mapeo de alias a nombres de columnas reales
    const aliasMapping = {
      id: 'tareas.id',
      titulo: 'tareas.titulo',
      descripcion: 'tareas.descripcion',
      estado: 'tareas.estado',
      createdAt: 'tareas.createdAt',
      updatedAt: 'tareas.updatedAt',
      deletedAt: 'tareas.deletedAt',
    }

    const queryBuilder = this._tareasRepository
      .createQueryBuilder('tareas')
      .select([
        'tareas.id as id',
        'tareas.titulo as "titulo"',
        'tareas.descripcion as "descripcion"',
        'tareas.estado as "estado"',
        'tareas.fecha_actualizacion as "updatedAt"',
        'tareas.fecha_creacion as "createdAt"',
      ])

    // Aplicar búsqueda si se proporciona
    if (search) {
      queryBuilder.where(
        'LOWER(tareas.titulo) LIKE :search OR ' +
        'tareas.descripcion::TEXT LIKE :search OR ' +
        '(CASE ' +
        '  WHEN tareas.estado = 1 THEN \'completado\' ' +
        '  WHEN tareas.estado = 2 THEN \'pendiente\' ' +
        'END) ILIKE :search OR ' + 
        'tareas.fecha_actualizacion::TEXT LIKE :search OR ' +
        'tareas.fecha_creacion::TEXT LIKE :search',
        { search: `%${search.toLowerCase()}%` }
      )
    }

    // Aplicar filtros adicionales si se proporcionan
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          queryBuilder.andWhere(`tareas.${key} = :${key}`, {
            [key]: params[key],
          })
        }
      })
    }

    // Aplicar ordenamiento dinámico basado en alias proporcionado
    if (order_by && aliasMapping[order_by]) {
      queryBuilder.orderBy(
        aliasMapping[order_by],
        order.toUpperCase() as 'ASC' | 'DESC'
      )
    } else {
      queryBuilder.orderBy('tareas.createdAt', 'DESC') 
    }

    const take = Number(row) > 0 ? Number(row) : 10 
    const pageNumber = Number(page) > 0 ? Number(page) : 1 
    const skip = (pageNumber - 1) * take 

    // Aplicar correctamente paginación con .limit() para forzar el límite
    queryBuilder.offset(skip).limit(take)

    // Obtener resultados y total de registros
    const [content, totalElements] = await Promise.all([
      queryBuilder.getRawMany(),
      queryBuilder.getCount(),
    ])

    return {
      content,
      totalElements,
    }
  }

  async findOneById(id: string): Promise<Tarea | null> {
    return await this._tareasRepository.findOne({ where: { id } });
  }

  async deleteTarea(id: string): Promise<void> {
    await this._tareasRepository.delete(id);
  }

  async tareasPendientes(): Promise<Tarea[]> {
    return await this._tareasRepository.find({ where: { estado: 2 } });
  }

  async tareasCompletadas(): Promise<Tarea[]> {
    return await this._tareasRepository.find({ where: { estado: 1 } });
  }
  
}
