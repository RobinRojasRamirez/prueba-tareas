import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn('increment', {
    comment: 'Identificador único de la tarea.',
  })
  id: string;

  @Column({
    nullable: true,
    unique: true,
    length: 255,
    comment: 'Titulo de la tarea.',
    name: 'titulo',
  })
  titulo: string;

  @Column({
      nullable: true,
      unique: true,
      length: 600,
      comment: 'Descripción de la tarea.',
      name: 'descripcion',
    })
  descripcion: string;

  @Column({
    type: 'int',
    nullable: true, 
    comment: 'Estado de la tarea.',
    name: 'estado',
  })
  estado: number;
 
  @CreateDateColumn({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora en que se creó la tarea.',
    name: 'fecha_creacion',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    comment: 'Fecha y hora de la última actualización de la tarea.',
    name: 'fecha_actualizacion',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
    comment: 'Fecha y hora en la que el usuario eliminó la tarea.',
    name: 'fecha_eliminacion',
  })
  deletedAt: Date;
}
