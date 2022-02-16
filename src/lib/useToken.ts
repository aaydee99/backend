import { sign, verify } from 'jsonwebtoken';

import { JWT_SECRET } from '../constants';
import { User } from '../entity/User';

export interface TokenPayload {
	userId: string;
	tokenVersion: number;
}

export const createToken = ({ id, tokenVersion }: User) => {
	const token = sign({ userId: id, tokenVersion }, JWT_SECRET, {
		expiresIn: '6h',
	});

	return token;
};

export const validateToken = (token: string) => {
	const payload = verify(token, JWT_SECRET) as TokenPayload;
	return payload;
};
