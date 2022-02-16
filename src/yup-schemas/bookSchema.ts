import { number, object, string } from 'yup';

export const addBook = object().shape({
	ISBN: string().trim().required(),
	title: string().trim().required(),
	subject: string().trim().required(),
	publisher: string().trim().required(),
	numberOfPages: number().integer().required(),
	author: string().trim().required(),
	numberOfCopies: number().integer().required(),
	price: number().required(),
});

export const updateBook = addBook;
