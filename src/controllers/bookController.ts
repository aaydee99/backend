import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { Book } from '../entity/Book';

export const POST_addBook: RequestHandler<ParamsDictionary, any, Book> = async (
	req,
	res
) => {
	const bookExists = await Book.findOne({ ISBN: req.body.ISBN });

	if (bookExists) {
		res.status(400).json({
			errors: [
				{
					path: 'ISBN',
					message: 'ISBN is already used',
				},
			],
		});

		return;
	}

	const book = await Book.create(req.body).save();
	res.json({ book });
};

export const GET_books: RequestHandler = async () => {
	//
};

export const GET_book: RequestHandler = async () => {
	//
};

export const PATCH_updateBook: RequestHandler<
	ParamsDictionary,
	any,
	Book
> = async () => {
	//
};

export const DELETE_deleteBook: RequestHandler = async () => {
	//
};
