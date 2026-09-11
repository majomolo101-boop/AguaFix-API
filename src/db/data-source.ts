import { DataSource, DataSourceOptions } from "typeorm";
import { envs } from "../config/envs";
import { UserEntity } from "../auth/entities/user.entity";
import { ReportEntity } from "../reports/entities/report.entity";

export const dataSourceOptions : DataSourceOptions = {
    host: envs.DB_HOST,
    type: 'postgres',
    database: envs.DB_NAME,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    port: envs.DB_PORT,
    entities: [UserEntity, ReportEntity],
    synchronize: false,
    migrations: ['dist/db/migrations/[0-9]*-*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;