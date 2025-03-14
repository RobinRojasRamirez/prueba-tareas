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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TareasService = void 0;
const common_1 = require("@nestjs/common");
const tareas_repository_1 = require("./tareas.repository");
let TareasService = class TareasService {
    constructor(_tareasRepository) {
        this._tareasRepository = _tareasRepository;
    }
    async createTarea(data) {
        return await this._tareasRepository.createTarea(data);
    }
    async updateTarea(id, data) {
        return await this._tareasRepository.updateTarea(id, data);
    }
    async listConnectionsPagable(pagableConnectionDto) {
        return await this._tareasRepository.listTareasPagable(pagableConnectionDto);
    }
    async getTareaById(id) {
        const tarea = await this._tareasRepository.findOneById(id);
        if (!tarea) {
            throw new common_1.NotFoundException(`No se encontró la tarea con el ID: ${id}`);
        }
        return tarea;
    }
    async deleteTareaById(id) {
        const tarea = await this._tareasRepository.findOneById(id);
        if (!tarea) {
            throw new common_1.NotFoundException('Tarea no encontrada.');
        }
        await this._tareasRepository.deleteTarea(id);
    }
    async getTareasPendientes() {
        return await this._tareasRepository.tareasPendientes();
    }
    async getTareasCompletadas() {
        return await this._tareasRepository.tareasCompletadas();
    }
};
exports.TareasService = TareasService;
exports.TareasService = TareasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tareas_repository_1.TareasRepository])
], TareasService);
//# sourceMappingURL=tareas.service.js.map