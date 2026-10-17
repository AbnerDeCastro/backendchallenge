import { defineConfig } from '@mikro-orm/postgresql';
export default defineConfig({
    host: '127.0.0.1',
    port: 5432,
    dbName: 'wagering',
    user: 'wagering_app',
    password: 'local_dev_password',
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    debug: false,
});
//# sourceMappingURL=mikro-orm.config.js.map