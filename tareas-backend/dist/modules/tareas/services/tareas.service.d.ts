import { PagableTareasDto } from '../dtos/pagable-tareas.dto';
import { Tarea } from 'src/models/entities/tarea.entity';
import { TareasRepository } from './tareas.repository';
import { CreateTareaDto } from '../dtos/create-tareas.dto';
export declare class TareasService {
    private readonly _tareasRepository;
    constructor(_tareasRepository: TareasRepository);
    createTarea(data: CreateTareaDto): Promise<Tarea>;
    updateTarea(id: string, data: CreateTareaDto): Promise<Tarea>;
    listConnectionsPagable(pagableConnectionDto: PagableTareasDto<null>): Promise<{
        content: Tarea[];
        totalElements: number;
    }>;
    getTareaById(id: string): Promise<Tarea>;
    deleteTareaById(id: string): Promise<void>;
    getTareasPendientes(): Promise<Tarea[]>;
    getTareasCompletadas(): Promise<Tarea[]>;
}
