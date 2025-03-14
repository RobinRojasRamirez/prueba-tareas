"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TareasRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const tarea_entity_1 = require("../../../models/entities/tarea.entity");
let TareasRepository = class TareasRepository {
    constructor(_tareasRepository) {
        this._tareasRepository = _tareasRepository;
    }
    async createTarea(data) {
        const nuevaTarea = this._tareasRepository.create(data);
        return await this._tareasRepository.save(nuevaTarea);
    }
    async updateTarea(id, data) {
        const tarea = await this._tareasRepository.findOne({ where: { id } });
        if (!tarea) {
            throw new common_1.NotFoundException(`La tarea con ID ${id} no existe.`);
        }
        Object.assign(tarea, data);
        return await this._tareasRepository.save(tarea);
    }
    async listTareasPagable(pagableTareasDto) {
        const { page, row, search, order, order_by, params } = pagableTareasDto;
        const aliasMapping = {
            id: 'tareas.id',
            titulo: 'tareas.titulo',
            descripcion: 'tareas.descripcion',
            estado: 'tareas.estado',
            createdAt: 'tareas.createdAt',
            updatedAt: 'tareas.updatedAt',
            deletedAt: 'tareas.deletedAt',
        };
        const queryBuilder = this._tareasRepository
            .createQueryBuilder('tareas')
            .select([
            'tareas.id as id',
            'tareas.titulo as "titulo"',
            'tareas.descripcion as "descripcion"',
            'tareas.estado as "estado"',
            'tareas.fecha_actualizacion as "updatedAt"',
            'tareas.fecha_creacion as "createdAt"',
        ]);
        if (search) {
            queryBuilder.where('LOWER(tareas.titulo) LIKE :search OR ' +
                'tareas.descripcion::TEXT LIKE :search OR ' +
                '(CASE ' +
                '  WHEN tareas.estado = 1 THEN \'completado\' ' +
                '  WHEN tareas.estado = 2 THEN \'pendiente\' ' +
                'END) ILIKE :search OR ' +
                'tareas.fecha_actualizacion::TEXT LIKE :search OR ' +
                'tareas.fecha_creacion::TEXT LIKE :search', { search: `%${search.toLowerCase()}%` });
        }
        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined && params[key] !== null) {
                    queryBuilder.andWhere(`tareas.${key} = :${key}`, {
                        [key]: params[key],
                    });
                }
            });
        }
        if (order_by && aliasMapping[order_by]) {
            queryBuilder.orderBy(aliasMapping[order_by], order.toUpperCase());
        }
        else {
            queryBuilder.orderBy('tareas.createdAt', 'DESC');
        }
        const take = Number(row) > 0 ? Number(row) : 10;
        const pageNumber = Number(page) > 0 ? Number(page) : 1;
        const skip = (pageNumber - 1) * take;
        queryBuilder.offset(skip).limit(take);
        const [content, totalElements] = await Promise.all([
            queryBuilder.getRawMany(),
            queryBuilder.getCount(),
        ]);
        return {
            content,
            totalElements,
        };
    }
    async findOneById(id) {
        return await this._tareasRepository.findOne({ where: { id } });
    }
    async deleteTarea(id) {
        await this._tareasRepository.delete(id);
    }
    async tareasPendientes() {
        return await this._tareasRepository.find({ where: { estado: 2 } });
    }
    async tareasCompletadas() {
        return await this._tareasRepository.find({ where: { estado: 1 } });
    }
};
exports.TareasRepository = TareasRepository;
exports.TareasRepository = TareasRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(tarea_entity_1.Tarea)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TareasRepository);
//# sourceMappingURL=tareas.repository.js.map