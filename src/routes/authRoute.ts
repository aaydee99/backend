import { Router } from 'express';

import * as controller from '../controllers/authController';
import { isAuth } from '../middlewares/isAuth';
import { isValid } from '../middlewares/isValid';
import * as schema from '../yup-schemas/authSchema';

const router = Router();

router.post('/register', isValid(schema.register), controller.POST_register);
router.post('/login', isValid(schema.login), controller.POST_login);
router.get('/me', isAuth, controller.GET_me);
router.get('/logout', isAuth, controller.GET_logout);

export const authRoute = router;
