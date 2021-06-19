import path from 'path';

const development = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: path.resolve(__dirname, '..', 'database.sqlite'),
    migrations: {
        directory: path.resolve(__dirname, 'database', 'migrations'),
    }
};

const production = {
    client: 'pg',
    migrations: {
        directory: path.resolve(__dirname, 'database', 'migrations'),
    },
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT || 5432),
        ssl: process.env.DATABASE_SSL
            ? {
                rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED === 'false' ? false : true
            }
            : undefined,
    }
};

export { development, production }
