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
exports.UpdateConnectionDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateConnectionDto {
}
exports.UpdateConnectionDto = UpdateConnectionDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El id debe ser una cadena de texto válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El id es obligatorio.' }),
    __metadata("design:type", String)
], UpdateConnectionDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto válido.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateConnectionDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'El campo isActive debe ser un booleano.' }),
    __metadata("design:type", Boolean)
], UpdateConnectionDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El host debe ser una cadena de texto válida.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateConnectionDto.prototype, "host", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El tipo de base de datos debe ser una cadena de texto válida.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateConnectionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser una cadena de texto válida.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateConnectionDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El nombre de usuario debe ser una cadena de texto válida.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateConnectionDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El nombre de la base de datos debe ser una cadena de texto válida.',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateConnectionDto.prototype, "database", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El puerto debe ser un número entero válido.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateConnectionDto.prototype, "port", void 0);
//# sourceMappingURL=update-tareas.dto.js.map