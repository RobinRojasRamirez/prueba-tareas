import { HttpStatus } from '@nestjs/common';
import { TareasService } from '../services/tareas.service';
import { PagableTareasDto } from '../dtos/pagable-tareas.dto';
import { CreateTareaDto } from '../dtos/create-tareas.dto';
export declare class TareasController {
    private readonly _tareasService;
    constructor(_tareasService: TareasService);
    createTareas(dto: CreateTareaDto): Promise<{
        status: boolean;
        statusCode: HttpStatus;
        message: string;
        data: import("../../../models/entities/tarea.entity").Tarea;
    }>;
    updateTarea(id: string, data: CreateTareaDto): Promise<{
        status: boolean;
        statusCode: HttpStatus;
        message: string;
        data: import("../../../models/entities/tarea.entity").Tarea;
    }>;
    listaTareasPagable(dto: PagableTareasDto<null>): Promise<{
        status: boolean;
        statusCode: HttpStatus;
        message: string;
        data: {
            content: import("../../../models/entities/tarea.entity").Tarea[];
            totalElements: number;
        };
    }>;
    findTareaById(id: string): Promise<{
        status: boolean;
        statusCode: HttpStatus;
        message: string;
        data: import("../../../models/entities/tarea.entity").Tarea;
    }>;
    deleteConnection(id: string): Promise<{
        status: boolean;
        statusCode: HttpStatus;
        message: string;
    }>;
    getPendientes(): Promise<{
        status: boolean;
        statusCode: HttpStatus;
        message: string;
        data: import("../../../models/entities/tarea.entity").Tarea[];
    }>;
    getCompletadas(): Promise<{
        status: boolean;
        statusCode: HttpStatus;
        message: string;
        data: import("../../../models/entities/tarea.entity").Tarea[];
    }>;
}
