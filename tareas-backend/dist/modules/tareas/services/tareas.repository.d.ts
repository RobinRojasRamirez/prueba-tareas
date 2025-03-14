import { Repository } from 'typeorm';
import { Tarea } from 'src/models/entities/tarea.entity';
import { PagableTareasDto } from '../dtos/pagable-tareas.dto';
import { CreateTareaDto } from '../dtos/create-tareas.dto';
export declare class TareasRepository {
    private readonly _tareasRepository;
    constructor(_tareasRepository: Repository<Tarea>);
    createTarea(data: CreateTareaDto): Promise<Tarea>;
    updateTarea(id: string, data: CreateTareaDto): Promise<Tarea>;
    listTareasPagable(pagableTareasDto: PagableTareasDto<null>): Promise<{
        content: Tarea[];
        totalElements: number;
    }>;
    findOneById(id: string): Promise<Tarea | null>;
    deleteTarea(id: string): Promise<void>;
    tareasPendientes(): Promise<Tarea[]>;
    tareasCompletadas(): Promise<Tarea[]>;
}
