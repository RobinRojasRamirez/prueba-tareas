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
exports.PagableTareasDto = void 0;
const class_validator_1 = require("class-validator");
class PagableTareasDto {
}
exports.PagableTareasDto = PagableTareasDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: 'La página debe ser un número entero válido.' }),
    (0, class_validator_1.Min)(0, { message: 'La página debe ser al menos 1.' }),
    __metadata("design:type", Number)
], PagableTareasDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'La cantidad de filas debe ser un número entero válido.' }),
    (0, class_validator_1.Min)(1, { message: 'La cantidad de filas debe ser al menos 1.' }),
    __metadata("design:type", Number)
], PagableTareasDto.prototype, "row", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El campo de búsqueda debe ser una cadena de texto válida.',
    }),
    __metadata("design:type", String)
], PagableTareasDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El orden debe ser una cadena de texto válida.' }),
    (0, class_validator_1.IsIn)(['ASC', 'DESC'], { message: 'El orden debe ser ASC o DESC.' }),
    __metadata("design:type", String)
], PagableTareasDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El campo de ordenamiento debe ser una cadena de texto válida.',
    }),
    __metadata("design:type", String)
], PagableTareasDto.prototype, "order_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], PagableTareasDto.prototype, "params", void 0);
//# sourceMappingURL=pagable-tareas.dto.js.map