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
exports.CreateTareaDto = void 0;
const class_validator_1 = require("class-validator");
class CreateTareaDto {
}
exports.CreateTareaDto = CreateTareaDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El titulo debe ser una cadena de texto válida.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El titulo es obligatorio.' }),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'la descripcion debe ser una cadena de texto válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La descripcion es obligatoria.' }),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'El estado debe ser un número entero válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El estado es obligatorio.' }),
    __metadata("design:type", Number)
], CreateTareaDto.prototype, "estado", void 0);
//# sourceMappingURL=create-tareas.dto.js.map