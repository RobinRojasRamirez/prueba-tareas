import { AppDataSource } from './database.config'

async function runSeeders() {
  try {
    // Inicializa la conexión
    await AppDataSource.initialize()
    console.log('Conexión a la base de datos establecida.')

    // Ejecutar ReferenceSeeder
    // const seeder = new ReferenceSeeder()
    // await seeder.run(AppDataSource)

    console.log('Seeding completado con éxito.')
  } catch (error) {
    console.error('Error al ejecutar el seeder:', error)
  } finally {
    await AppDataSource.destroy() // Cierra la conexión
    console.log('Conexión cerrada.')
  }
}

runSeeders()
