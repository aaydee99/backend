import { Router } from 'express';

import * as controller from '../controllers/bookController';
import { isAuth } from '../middlewares/isAuth';
import { isValid } from '../middlewares/isValid';
import * as schema from '../yup-schemas/bookSchema';

const router = Router();

router.post('/add', isAuth, isValid(schema.addBook), controller.POST_addBook);
router.get('/', isAuth, controller.GET_books);
router.get('/:id', isAuth, controller.GET_book);

router.patch(
	'/update/:id',
	isAuth,
	isValid(schema.updateBook),
	controller.PATCH_updateBook
);

router.patch('/delete/:id', isAuth, controller.DELETE_deleteBook);

export const bookRoute = router;
