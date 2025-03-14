import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { DialogModule } from 'primeng/dialog'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { InputTextModule } from 'primeng/inputtext'
import { CalendarModule } from 'primeng/calendar'
import { lastValueFrom } from 'rxjs'
import { TareasService } from '../../../services/tareas.service'
import { ITareasShow } from '../../../interfaces/tareas-show.interface'
import { SelectButton } from 'primeng/selectbutton'
import { IEstadoOpcion } from '../../../interfaces/estado-opcion.interface'
import { AlertService } from '../../../../../shared/services/alert.service'

@Component({
  selector: 'app-form-tareas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ProgressSpinnerModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    CalendarModule,
    SelectButton
  ],
  templateUrl: './form-tareas.component.html',
  styleUrls: ['./form-tareas.component.css'],
  providers: [MessageService]
})
export class FormTareasComponent implements OnChanges {

  stateOptions: IEstadoOpcion[] = [
    { label: 'Pendiente', value: '2' },
    { label: 'Completado', value: '1' }
  ];

  @Input() displayModal = false;
  @Input() id: number = 0;
  @Input() slug: string | null = '';
  @Output() closeModal = new EventEmitter<boolean>();

  title: string = '';
  frmTareas!: FormGroup;
  loading: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _alertService: AlertService,
    private _tareasService: TareasService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes['id'] && changes['id'].currentValue !== changes['id'].previousValue ) {
      this.initForm();
      if ( this.id ) {
        this.title = 'Editar Tarea';
        this.loadTarea();
      } else {
        this.title = 'Crear Tarea';
      }
    }
  }

  private initForm(): void {
    this.frmTareas = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['']
    });
  }

  private async loadTarea(): Promise<void> {
    this.isLoading = true;
    try {
      const response = await lastValueFrom(this._tareasService.getTareaById(this.id));
      if (response.statusCode === 200) {
        const data: ITareasShow = response.data;
        this.frmTareas.setValue({
          id: data.id,
          titulo: data.titulo,
          descripcion: data.descripcion,
          estado: String(data.estado)
        });
      }
    } catch (error) {
      this._alertService.showError('Mensaje del sistema.', 'Error al cargar la información');
      this.hideModal();
    } finally {
      this.isLoading = false;
    }
  }

  hideModal(): void {
    this.displayModal = false;
    this.closeModal.emit(false);
  }

  private transformData(): ITareasShow {
    const formValues = this.frmTareas.getRawValue();
    return {
      id: this.id || 0,
      titulo: formValues.titulo,
      descripcion: formValues.descripcion,
      estado: String(formValues.estado)
    };
  }

  async onSubmit(): Promise<void> {
    if (this.frmTareas.invalid) {
      this._alertService.showError('Mensaje del sistema.', 'Completa todos los campos correctamente');
      return;
    }
    const transformedData = this.transformData();
    this.isLoading = true;
    try {
      const response = this.slug === 'crear'
        ? await lastValueFrom(this._tareasService.crearTarea(transformedData))
        : await lastValueFrom(this._tareasService.actualizarTarea(this.id, transformedData));

      if ([200, 201].includes(response.statusCode)) {
        const successMessage = this.slug === 'crear' ? 'Tarea creada exitosamente' : 'Tarea actualizada exitosamente';
        this._alertService.showSuccess('Mensaje del sistema.', response.message || successMessage);
        this.hideModal();
      }
    } catch (error) {
      this._alertService.showError('Mensaje del sistema.', 'Error al guardar la tarea');
    } finally {
      this.isLoading = false;
    }
  }
  
}