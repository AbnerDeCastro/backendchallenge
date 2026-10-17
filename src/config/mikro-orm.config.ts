import { defineConfig } from '@mikro-orm/postgresql';
import { WalletEntity } from '../infrastructure/database/entities/wallet.entity.js';

export default defineConfig({
  // Config PostgreSQL
  host: '127.0.0.1',
  port: 5432,
  dbName: 'wagering',
  user: 'wagering_app',
  password: 'local_dev_password',

  entities: [WalletEntity],
  entitiesTs: [WalletEntity],

  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },


  debug: true,
});