import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
import { registerAs } from "@nestjs/config";

dotenv.config({
    path: '.env.development',
});

const PostgresDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migration/*{.ts, .js}'],
    subscribers: [],
    // ssl: true,
}

export const postgresDataSourceConfig = registerAs(
    'postgres',
    () => PostgresDataSourceOptions,
);

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);