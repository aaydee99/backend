import { RequestHandler } from 'express';

import { validateToken } from '../lib/useToken';
import { User } from '../entity/User';

export const isAuth: RequestHandler = async (req, res, next) => {
	const errors = [
		{
			path: 'user',
			message: 'user is unauthorized',
		},
	];

	try {
		const { authorization } = req.headers;

		if (!authorization?.startsWith('Bearer ')) {
			res.status(401).json({ errors });
			return;
		}

		const token = authorization.split(' ')[1];
		const payload = validateToken(token);
		const user = await User.findOneOrFail(payload.userId);

		if (user.tokenVersion !== payload.tokenVersion) {
			res.status(401).json({ errors });
			return;
		}

		user.token = token;
		(req as any).user = user;

		next();
	} catch (err) {
		res.status(401).json({ errors });
	}
};
