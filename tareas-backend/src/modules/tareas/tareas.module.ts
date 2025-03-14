import { Module } from '@nestjs/common'
import { TareasController } from './controllers/tareas.controller'
import { TareasRepository } from './services/tareas.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TareasService } from './services/tareas.service'
import { Tarea } from 'src/models/entities/tarea.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Tarea])],
  controllers: [TareasController],
  providers: [TareasRepository, TareasService],
  exports: [TareasRepository, TareasService],
})
export class TareasModule {}
