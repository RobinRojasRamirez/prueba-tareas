import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TareasModule } from './modules/tareas/tareas.module'
import { databaseConfig } from './config/database/database.config'

@Module({
  imports: [
    TareasModule,
    TypeOrmModule.forRoot(databaseConfig),
  ],
  providers: [],
  exports: [],
})
export class AppModule {}