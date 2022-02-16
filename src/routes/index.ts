import { Express } from 'express';

import { authRoute } from './authRoute';
import { bookRoute } from './bookRoute';

export const useRoutes = (app: Express) => {
	app.use('/auth', authRoute);
	app.use('/books', bookRoute);
};
