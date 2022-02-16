import { compare } from 'bcryptjs';
import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { getRepository } from 'typeorm';

import { User } from '../entity/User';
import { createToken } from '../lib/useToken';

export const POST_register: RequestHandler<
	ParamsDictionary,
	any,
	User
> = async (req, res) => {
	const userExists = await User.findOne({ email: req.body.email });

	if (userExists) {
		res.status(400).json({
			errors: [
				{
					path: 'email',
					message: 'email is already registered',
				},
			],
		});

		return;
	}

	const user = await User.create(req.body).save();
	user.token = createToken(user);

	const { password, tokenVersion, ...resUser } = user;
	res.json({ user: resUser });
};

export const POST_login: RequestHandler = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	const errors = [
		{
			path: 'email',
			message: 'email or password is incorrect',
		},
	];

	if (!user) {
		res.status(401).json({ errors });
		return;
	}

	const isMatch = await compare(req.body.password, user.password);

	if (!isMatch) {
		res.status(401).json({ errors });
		return;
	}

	user.token = createToken(user);

	const { password, tokenVersion, ...resUser } = user;
	res.json({ user: resUser });
};

export const GET_me: RequestHandler = (req, res) => {
	const { password, tokenVersion, ...user } = (req as any).user as User;
	res.json({ user });
};

export const GET_logout: RequestHandler = async (req, res) => {
	const userRepo = getRepository(User);
	const { affected } = await userRepo.increment(
		{ id: (req as any).user.id },
		'tokenVersion',
		1
	);

	res.json({ success: !!affected });
};
