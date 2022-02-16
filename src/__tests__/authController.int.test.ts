import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';

import { app } from '../app';
import { User } from '../entity/User';
import { getConnectionConfig } from '../ormconfig';

interface ObjectWithUser {
	user: User;
}

const fetcher = request(app);
const dummyInput = {
	name: 'Coco',
	email: 'coco@gmail.com',
	password: 'Coco@2',
	phone: '09223456789',
};

let token = '';
const getAuthReqHeaders = () => {
	return ['Authorization', `Bearer ${token}`] as const;
};

beforeAll(async () => {
	const connectionConfig = getConnectionConfig();
	await createConnection({ ...connectionConfig!, name: 'default' });
});

afterAll(async () => {
	const connection = getConnection();
	await connection.close();
});

describe('POST_register controller tests', () => {
	it('validation works', async () => {
		const { text } = await fetcher
			.post('/auth/register')
			.set('Content-Type', 'application/json')
			.send({
				name: ' ',
				email: 'cocogmail.com',
				password: 'just5',
				phone: ' ',
			});

		expect(JSON.parse(text)).toMatchSnapshot();
	});

	it('can register not taken email', async () => {
		const { text } = await fetcher
			.post('/auth/register')
			.set('Content-Type', 'application/json')
			.send(dummyInput);

		const { user: resUser } = JSON.parse(text) as ObjectWithUser;
		const { id, dateOfMembership, token: jwt, ...user } = resUser;

		expect(id).toBeDefined();
		expect(dateOfMembership).toBeDefined();
		expect(jwt).toBeDefined();
		expect(user).toMatchSnapshot();
	});

	it("CAN'T register already taken email", async () => {
		const { text } = await fetcher
			.post('/auth/register')
			.set('Content-Type', 'application/json')
			.send(dummyInput);

		expect(JSON.parse(text)).toMatchSnapshot();
	});
});

describe('POST_login controller tests', () => {
	it('validation works', async () => {
		const { text } = await fetcher
			.post('/auth/login')
			.set('Content-Type', 'application/json')
			.send({
				email: 'cocogmail.com',
				password: '',
			});

		expect(JSON.parse(text)).toMatchSnapshot();
	});

	it("CAN'T login incorrect credentials", async () => {
		const { text } = await fetcher
			.post('/auth/login')
			.set('Content-Type', 'application/json')
			.send({
				...dummyInput,
				email: 'coco2@gmail.com',
			});

		expect(JSON.parse(text)).toMatchSnapshot();

		const { text: text2 } = await fetcher
			.post('/auth/login')
			.set('Content-Type', 'application/json')
			.send({
				...dummyInput,
				password: 'Coco@3',
			});

		expect(JSON.parse(text2)).toMatchSnapshot();
	});

	it('can login correct credentials', async () => {
		const { text } = await fetcher
			.post('/auth/login')
			.set('Content-Type', 'application/json')
			.send(dummyInput);

		const { user: resUser } = JSON.parse(text) as ObjectWithUser;
		const { id, dateOfMembership, token: jwt, ...user } = resUser;
		token = jwt;

		expect(id).toBeDefined();
		expect(dateOfMembership).toBeDefined();
		expect(jwt).toBeDefined();
		expect(user).toMatchSnapshot();
	});
});

describe('GET_me controller tests', () => {
	it('CAN\'T get "me" if not logged in', async () => {
		const { text } = await fetcher.get('/auth/me');
		expect(JSON.parse(text)).toMatchSnapshot();
	});

	it('can get "me" if logged in', async () => {
		const { text } = await fetcher.get('/auth/me').set(...getAuthReqHeaders());
		const { user: resUser } = JSON.parse(text) as ObjectWithUser;
		const { id, dateOfMembership, token: jwt, ...user } = resUser;

		expect(id).toBeDefined();
		expect(dateOfMembership).toBeDefined();
		expect(jwt).toBeDefined();
		expect(user).toMatchSnapshot();
	});
});

describe('GET_logout controller tests', () => {
	it("CAN'T logout if not logged in", async () => {
		const { text } = await fetcher.get('/auth/logout');
		expect(JSON.parse(text)).toMatchSnapshot();
	});

	it('can logout if logged in', async () => {
		const { text } = await fetcher
			.get('/auth/logout')
			.set(...getAuthReqHeaders());

		expect(JSON.parse(text)).toMatchSnapshot();

		const { text: text2 } = await fetcher
			.get('/auth/me')
			.set(...getAuthReqHeaders());

		expect(JSON.parse(text2)).toMatchSnapshot();
	});
});
