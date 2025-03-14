import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { lastValueFrom } from 'rxjs';
import { TareasService } from '../tareas/services/tareas.service';
import { ITareasShow } from '../tareas/interfaces/tareas-show.interface';


@Component({
  selector: 'app-dashboard',
  imports: [
    CardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public tareasPendientes: ITareasShow[] = [];
  public tareasCompletadas: ITareasShow[] = [];
  pendientes: number = 0
  completadas: number = 0

  constructor(
    private readonly _tareasService: TareasService
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getTareasPendientes()
    this.getTareasCompletadas()
  }

  async getTareasPendientes() {
    const response = await lastValueFrom(this._tareasService.getTareasPendientes());
    if ( response.statusCode === 200 ) {
      this.tareasPendientes = response.data;
      this.pendientes = this.tareasPendientes.length
    }
  }

  async getTareasCompletadas() {
    const response = await lastValueFrom(this._tareasService.getTareasCompletadas());
    if ( response.statusCode === 200 ) {
      this.tareasCompletadas = response.data;
      this.completadas = this.tareasCompletadas.length
    }
  }

}