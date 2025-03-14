import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IParamsTable } from '../../../shared/interfaces/params-table.interface';
import { IResponseTableApi } from '../../../shared/interfaces/response-table-api.interface';
import { IResponseApi } from '../../../shared/interfaces/response-api.interface';
import { ITareasTable } from '../interfaces/tareas-table.interface';
import { ITareasShow } from '../interfaces/tareas-show.interface';

@Injectable({
  providedIn: 'root',
})
export class TareasService {

  API_URL_BASE =  environment.apiUrl + '/tareas'

  constructor(private readonly _httpClient: HttpClient) { }

  // Obtener datos para datatable apis
  getTareasTable(iFilterTable: IParamsTable<null>): Observable<IResponseTableApi<ITareasTable>> {
    return this._httpClient.post<IResponseTableApi<ITareasTable>>(`${this.API_URL_BASE}/pagable`, iFilterTable);
  }

  // Obtener datos de la tarea por id
  getTareaById(id: number): Observable<IResponseApi<ITareasShow>>{
    return this._httpClient.get<IResponseApi<ITareasShow>>(`${this.API_URL_BASE}/find-by-id/${id}`);
  }

  // Guardar tarea en el backend
  crearTarea(alumno: ITareasShow): Observable<IResponseApi<ITareasShow>> {
    return this._httpClient.post<IResponseApi<ITareasShow>>(`${this.API_URL_BASE}/create`, alumno);
  }

  // Editar tarea en el backend
  actualizarTarea(id: number, alumno: ITareasShow): Observable<IResponseApi<ITareasShow>> {
    return this._httpClient.put<IResponseApi<ITareasShow>>(`${this.API_URL_BASE}/${id}`, alumno);
  }

  // Eliminar tarea
  deletedTareaById(id: number): Observable<IResponseApi<ITareasShow>> {
    return this._httpClient.delete<IResponseApi<ITareasShow>>(`${this.API_URL_BASE}/delete/${id}`);
  }

  getTareasPendientes() {
    return this._httpClient.get<IResponseApi<ITareasShow[]>>(`${this.API_URL_BASE}/pendientes`);
  }

  getTareasCompletadas() {
    return this._httpClient.get<IResponseApi<ITareasShow[]>>(`${this.API_URL_BASE}/completadas`);
  }

}