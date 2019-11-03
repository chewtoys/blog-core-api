import { Router } from 'express';

import * as UserController from '../controllers/UserController';

const router = Router();

router.get('/', UserController.getUsers);

router.get('/filter', UserController.getUsersByFilters);

router.get('/:id(\\d+)', UserController.getUserById);

router.post("/", UserController.createUser);

router.put("/:id", UserController.updateUser);

// router.patch('/roles/:id', UserController.updateUserRole);

// router.delete("/:id", UserController.deleteUser);

export { router }
