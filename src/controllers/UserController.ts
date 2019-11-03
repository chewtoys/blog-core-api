import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';

/**
 * Return list of all enabled users
 *
 * @author Julien Guillot
 * @since 01-NOV-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function getUsers(request: Request, response: Response): Promise<Response> {
    try {
        const users = await getCustomRepository(UserRepository).findAll();

        if (users.length > 0) {
            return response.status(200).json(users);
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: 'Could not retrieve users list',
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}

/**
 * Return a list of users based on provided filters
 *
 * @author Julien Guillot
 * @since 01-NOV-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function getUsersByFilters(request: Request, response: Response): Promise<Response> {
    try {
        const users = await getCustomRepository(UserRepository).findAllByFilters({
            status: request.query.status,
            roles: request.query.roles
        });

        if (users.length > 0) {
            return response.status(200).json(users);
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: `Could not retrieve users with filters: ${ request.params }`,
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}

/**
 * Return a single enabled user by id
 *
 * @author Julien Guillot
 * @since 01-NOV-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function getUserById(request: Request, response: Response): Promise<Response> {
    try {
        const id = Number(request.params.id);
        const result = await getCustomRepository(UserRepository).findOneById(id);

        if (result) {
            return response.status(200).json(result);
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: `Could not retrieve user with id: ${ request.params.id }`,
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}

/**
 * Insert a new user in the database if it is not already existing
 *
 * @author Julien Guillot
 * @since 03-NOV-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function createUser(request: Request, response: Response): Promise<Response> {
    try {
        const user = new User().populate(request.body);
        const result = await getCustomRepository(UserRepository).insertUser(user);

        if (result) {
            return response.status(201).json(result);
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: `Could not create user with values: ${ request.body }`,
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}

/**
 * Update a user based on id
 *
 * @author Julien Guillot
 * @since 03-NOV-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function updateUser(request: Request, response: Response): Promise<Response> {
    try {
        const user = new User().populate(request.body);
        const result = await getCustomRepository(UserRepository).updateUser(user);

        if (result) {
            return response.status(200).json(result);
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: `Could not update user with values: ${ request.body }`,
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}
