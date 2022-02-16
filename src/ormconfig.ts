import { ConnectionOptions } from 'typeorm';

import { DATABASE_URL, NODE_ENV } from './constants';

const ormConfig: ConnectionOptions[] = [
	{
		name: 'development',
		type: 'better-sqlite3',
		database: 'database.sqlite',
		synchronize: true,
		logging: true,
		// dropSchema: true,
		entities: ['src/entity/**/*.ts'],
		migrations: ['src/migration/**/*.ts'],
		subscribers: ['src/subscriber/**/*.ts'],
		cli: {
			entitiesDir: 'src/entity',
			migrationsDir: 'src/migration',
			subscribersDir: 'src/subscriber',
		},
	},
	{
		name: 'test',
		type: 'better-sqlite3',
		database: 'database.test.sqlite',
		synchronize: true,
		logging: false,
		dropSchema: true,
		entities: ['src/entity/**/*.ts'],
		migrations: ['src/migration/**/*.ts'],
		subscribers: ['src/subscriber/**/*.ts'],
		cli: {
			entitiesDir: 'src/entity',
			migrationsDir: 'src/migration',
			subscribersDir: 'src/subscriber',
		},
	},
	{
		name: 'production',
		type: 'postgres',
		url: DATABASE_URL,
		synchronize: true, // switch this to false after the initial tables created. use migrations instead afterwards
		logging: false,
		entities: ['dist/entity/**/*.js'],
		migrations: ['dist/migration/**/*.js'],
		subscribers: ['dist/subscriber/**/*.js'],
		cli: {
			entitiesDir: 'dist/entity',
			migrationsDir: 'dist/migration',
			subscribersDir: 'dist/subscriber',
		},
		ssl: true,
		extra: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
	},
];

export const getConnectionConfig = (connName?: string) => {
	const config = ormConfig.find(
		(config) => (connName || NODE_ENV) === config.name
	);

	return config;
};
