import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_USER: env.get('MAILER_USER').required().asString(),
    MAILER_TOKEN: env.get('MAILER_TOKEN').required().asString(),
    MAIL_FROM: env.get('MAIL_FROM').required().asString(),
    DB_NAME: env.get('DB_NAME').required().asString(),
    DB_HOST: env.get('DB_HOST').required().asString(),
    DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
    DB_USER: env.get('DB_USER').required().asString(),
    DB_PORT: env.get('DB_PORT').required().asPortNumber(),
};