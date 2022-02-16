import useCors from 'cors';
import express, { Express } from 'express';

import { CLIENT_URI } from '../constants';

export const useMiddlewares = (app: Express) => {
	const cors = useCors({
		origin: CLIENT_URI,
	});

	app.use(cors);
	app.use(express.json());
};
