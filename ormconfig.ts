const pathDir = process.env.NODE_ENV !== 'production' ? './src' : './dist';
var extension = process.env.NODE_ENV !== 'production' ? '.ts' : '.js';

export default [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    synchronize: false,
    soft: true,
    entities: [pathDir + '/modules/**/infra/typeorm/entities/*' + extension],
    migrations: [pathDir + '/shared/infra/typeorm/migrations/*' + extension],
    cli: {
      migrationsDir: pathDir + '/shared/infra/typeorm/migrations',
    },
  },
];
