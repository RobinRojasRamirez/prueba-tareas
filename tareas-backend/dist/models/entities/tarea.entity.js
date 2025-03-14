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
exports.Tarea = void 0;
const typeorm_1 = require("typeorm");
let Tarea = class Tarea {
};
exports.Tarea = Tarea;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', {
        comment: 'Identificador único de la tarea.',
    }),
    __metadata("design:type", String)
], Tarea.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        unique: true,
        length: 255,
        comment: 'Titulo de la tarea.',
        name: 'titulo',
    }),
    __metadata("design:type", String)
], Tarea.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        unique: true,
        length: 600,
        comment: 'Descripción de la tarea.',
        name: 'descripcion',
    }),
    __metadata("design:type", String)
], Tarea.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        comment: 'Estado de la tarea.',
        name: 'estado',
    }),
    __metadata("design:type", Number)
], Tarea.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha y hora en que se creó la tarea.',
        name: 'fecha_creacion',
    }),
    __metadata("design:type", Date)
], Tarea.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        nullable: true,
        comment: 'Fecha y hora de la última actualización de la tarea.',
        name: 'fecha_actualizacion',
    }),
    __metadata("design:type", Date)
], Tarea.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        nullable: true,
        comment: 'Fecha y hora en la que el usuario eliminó la tarea.',
        name: 'fecha_eliminacion',
    }),
    __metadata("design:type", Date)
], Tarea.prototype, "deletedAt", void 0);
exports.Tarea = Tarea = __decorate([
    (0, typeorm_1.Entity)('tareas')
], Tarea);
//# sourceMappingURL=tarea.entity.js.map