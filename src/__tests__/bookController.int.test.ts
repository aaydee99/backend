// import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';

// import { app } from '../app';
import { getConnectionConfig } from '../ormconfig';

beforeAll(async () => {
	const connectionConfig = getConnectionConfig();
	await createConnection({ ...connectionConfig!, name: 'default' });
});

afterAll(async () => {
	const connection = getConnection();
	await connection.close();
});

describe('POST_addBook controller tests', () => {
	it('validation works', async () => {
		//
	});

	it('can add not used ISBN', async () => {
		//
	});

	it("CAN'T add already used ISBN", async () => {
		//
	});
});
