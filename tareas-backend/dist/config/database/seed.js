"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = require("./database.config");
async function runSeeders() {
    try {
        await database_config_1.AppDataSource.initialize();
        console.log('Conexión a la base de datos establecida.');
        console.log('Seeding completado con éxito.');
    }
    catch (error) {
        console.error('Error al ejecutar el seeder:', error);
    }
    finally {
        await database_config_1.AppDataSource.destroy();
        console.log('Conexión cerrada.');
    }
}
runSeeders();
//# sourceMappingURL=seed.js.map