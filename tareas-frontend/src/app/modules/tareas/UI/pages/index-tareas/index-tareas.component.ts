import { Component, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TareasService } from '../../../services/tareas.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from '../../../../../shared/services/alert.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITareasTable } from '../../../interfaces/tareas-table.interface';
import { IParamsTable } from '../../../../../shared/interfaces/params-table.interface';
import { ICols } from '../../../../../shared/interfaces/cols.interface';
import { Menu, MenuModule } from 'primeng/menu'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import transform from '../../../../../shared/utils/filter-table.transform';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag'
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormTareasComponent } from '../form-tareas/form-tareas.component';
import { ChipModule } from 'primeng/chip';
import { SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-index-tareas',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    RouterModule,
    TagModule,
    MenuModule,
    FormTareasComponent,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    IconFieldModule,
    InputIconModule,
    ChipModule,
    SelectButton
  ],
  templateUrl: './index-tareas.component.html',
  styleUrl: './index-tareas.component.css'
})
export class IndexTareasComponent {

  @ViewChild(Menu) menu?: Menu;
  frmGrado!: FormGroup;
  status: string = 'success'
  rowSize: number = 10
  listsTareas: ITareasTable[] = []
  totalRecords: number = 0
  iParamsTable!: IParamsTable<null>
  loadingTable: boolean = false
  selectedId: number | null = null;
  slug: string = ''
  displayModal: boolean = false
  id: number = 0

  stateFilterOptions = [
    { label: 'Pendientes', value: '2' },
    { label: 'Completadas', value: '1' },
    { label: 'Todas', value: null },
  ];
// Estado seleccionado
  selectedStateFilter: string | null = null;

  cols: ICols[] = [
    { field: 'titulo', header: 'Titulo', type: 'string', nameClass: 'text-left', class: 'text-left', order: true },
    { field: 'descripcion', header: 'Descripción', type: 'string', nameClass: 'text-left', class: 'text-left', order: true },
    { field: 'estado', header: 'Estado', type: 'chip', nameClass: 'text-center', class: 'text-center', minWidth: '100px', order: true },
    { field: 'actions', header: 'Acciones', type: 'actions', nameClass: 'text-center', minWidth: '80px', order: false },
  ];

  menuItems = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => {
        this.openModalTareas('editar', this.id);
      }
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => {
        this.deleted(this.id);
      }
    }
  ];

  constructor(
    private readonly _tareasService: TareasService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _alertService: AlertService,
    private readonly fb: FormBuilder,
  ) {
  }

  applyStateFilter() {
    this.loadTable({ first: 0 }); 
  }

  getEstadoLabel(estado: number): string {
    return estado === 1 ? 'Completado' : 'Pendiente';
  }
  
  getEstadoClass(estado: number): string {
    return estado === 1 ? 'bg-green-500 text-white' : 'bg-orange-500 text-white';
  }

  openMenu(event: Event, menu: Menu, id: number) {
    this.id = id;
    menu.toggle(event);
  }

  openModalTareas(slug: string = '', id: number = 0 ) {
    this.displayModal = true
    this.slug = slug
    this.id = id
  }

  async loadTable(lazyLoadEvent: TableLazyLoadEvent = {}): Promise<void> {
    try {
      this.loadingTable = true
      this.iParamsTable = transform(lazyLoadEvent, this.rowSize)
      this.iParamsTable.params = this.selectedStateFilter ? { estado: this.selectedStateFilter } : null;
      const response = await lastValueFrom(
        this._tareasService.getTareasTable(this.iParamsTable)
      )
      const data = response.data
      this.listsTareas = data.content
      this.totalRecords = data.totalElements
      this.loadingTable = false
    } catch (error) {
      this.loadingTable = false
      this.listsTareas = []
      this.totalRecords = 0
    }
  }


  getSeverity(value: string): "success" | "info" | "warn" | "danger" | "secondary" | "contrast" | undefined {
    switch (value.toLowerCase()) {
      case 'completado':
        return 'success';
      case 'pendiente':
        return 'warn';
      case 'en progreso':
        return 'info';
      case 'fallido':
        return 'danger';
      default:
        // Valor por defecto si no coincide
        return 'secondary';
    }
  }

  refreshData(hide = false) {
    this.displayModal = hide
    this.loadTable()
  }

  async deleted(id: number): Promise<void> {
    this._confirmationService.confirm({
      message: '¿Quieres eliminar este registro?',
      header: 'Eliminar elemento',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: async () => {
        const response = await lastValueFrom(
          this._tareasService.deletedTareaById(id)
        ).catch((error) => {
          this._alertService.showError('Mensaje del sistema', error.message)
        })
        if ( response ) {
          this.loadTable()
          this._alertService.showSuccess('Mensaje del sistema', response.message)
        }
      },
    })
  }
  
}
