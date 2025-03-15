"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.databaseConfig = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'db',
    entities: [__dirname + '/../../models/entities/**/*.entity{.ts,.js}'],
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: false,
};
exports.AppDataSource = new typeorm_1.DataSource(exports.databaseConfig);
//# sourceMappingURL=database.config.js.map