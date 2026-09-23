import path from 'path';
import type { Core } from '@strapi/strapi';
import { parse } from 'pg-connection-string';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Database => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const databaseUrl = env('DATABASE_URL');
  let postgresConnection: Record<string, any>;

  if (databaseUrl) {
    const parsed = parse(databaseUrl);
    postgresConnection = {
      host: parsed.host,
      port: parsed.port ? parseInt(parsed.port, 10) : 5432,
      database: parsed.database,
      user: parsed.user,
      password: parsed.password,
      ssl: env.bool('DATABASE_SSL', true)
        ? {
            rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
          }
        : false,
      schema: env('DATABASE_SCHEMA', 'public'),
    };
  } else {
    postgresConnection = {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'polymers_db'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'postgres'),
      ssl: env.bool('DATABASE_SSL', false) && {
        key: env('DATABASE_SSL_KEY', undefined),
        cert: env('DATABASE_SSL_CERT', undefined),
        ca: env('DATABASE_SSL_CA', undefined),
        capath: env('DATABASE_SSL_CAPATH', undefined),
        cipher: env('DATABASE_SSL_CIPHER', undefined),
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
      },
      schema: env('DATABASE_SCHEMA', 'public'),
    };
  }

  const connections: Record<string, any> = {
    postgres: {
      connection: postgresConnection,
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

export default config;

