import { RequestHandler } from 'express';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { object, ValidationError } from 'yup';

const { shape } = object();

type IsValid = (schema: ReturnType<typeof shape>) => RequestHandler;

export const isValid: IsValid = (schema) => async (req, res, next) => {
	try {
		req.body = await schema.validate(req.body, {
			abortEarly: false,
			stripUnknown: true,
		});

		if (req.body.email) {
			req.body.email = normalizeEmail(req.body.email);
		}

		next();
	} catch (err) {
		const errors = (err as ValidationError).inner.map(({ path, message }) => ({
			path,
			message,
		}));

		res.json({ errors });
	}
};
