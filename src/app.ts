import express from 'express';

import { useMiddlewares } from './middlewares';
import { useRoutes } from './routes';

const expressApp = express();
useMiddlewares(expressApp);
useRoutes(expressApp);

export const app = expressApp;
