import { Router } from 'express';

import { router as post } from './routes/posts.routes';
import { router as role } from './routes/roles.routes';
import { router as user } from './routes/users.routes';

const routes = Router();

routes.use('/posts', post);
// routes.use('/roles', role);
routes.use('/users', user);

export { routes };
