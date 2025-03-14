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
exports.TareasController = void 0;
const common_1 = require("@nestjs/common");
const tareas_service_1 = require("../services/tareas.service");
const pagable_tareas_dto_1 = require("../dtos/pagable-tareas.dto");
const create_tareas_dto_1 = require("../dtos/create-tareas.dto");
let TareasController = class TareasController {
    constructor(_tareasService) {
        this._tareasService = _tareasService;
    }
    async createTareas(dto) {
        try {
            const connection = await this._tareasService.createTarea(dto);
            return {
                status: true,
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Conexión creada exitosamente.',
                data: connection,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Error al crear la conexión.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateTarea(id, data) {
        try {
            const tareaActualizada = await this._tareasService.updateTarea(id, data);
            return {
                status: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Tarea actualizada exitosamente.',
                data: tareaActualizada,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Error al actualizar la tarea.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async listaTareasPagable(dto) {
        try {
            const tareas = await this._tareasService.listConnectionsPagable(dto);
            return {
                status: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Tareas obtenidas exitosamente.',
                data: tareas,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Error al obtener las tareas.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findTareaById(id) {
        try {
            const tarea = await this._tareasService.getTareaById(id);
            return {
                status: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Tarea obtenida exitosamente.',
                data: tarea,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Error al obtener la tarea.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteConnection(id) {
        try {
            await this._tareasService.deleteTareaById(id);
            return {
                status: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Tarea eliminada exitosamente.',
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Error al eliminar la tarea.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getPendientes() {
        try {
            const tareasPendientes = await this._tareasService.getTareasPendientes();
            return {
                status: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Tarea obtenida exitosamente.',
                data: tareasPendientes,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Error al obtener la tarea.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCompletadas() {
        try {
            const tareasCompletadas = await this._tareasService.getTareasCompletadas();
            return {
                status: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Tarea obtenida exitosamente.',
                data: tareasCompletadas,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Error al obtener la tarea.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TareasController = TareasController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tareas_dto_1.CreateTareaDto]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "createTareas", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_tareas_dto_1.CreateTareaDto]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "updateTarea", null);
__decorate([
    (0, common_1.Post)('pagable'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagable_tareas_dto_1.PagableTareasDto]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "listaTareasPagable", null);
__decorate([
    (0, common_1.Get)('find-by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "findTareaById", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "deleteConnection", null);
__decorate([
    (0, common_1.Get)('pendientes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "getPendientes", null);
__decorate([
    (0, common_1.Get)('completadas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "getCompletadas", null);
exports.TareasController = TareasController = __decorate([
    (0, common_1.Controller)('tareas'),
    __metadata("design:paramtypes", [tareas_service_1.TareasService])
], TareasController);
//# sourceMappingURL=tareas.controller.js.map