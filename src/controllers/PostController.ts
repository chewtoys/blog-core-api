import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Post } from '../models/Post';

/**
 * Get all the posts
 *
 * @author Julien Guillot
 * @since 26-OCT-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function getPosts(request: Request, response: Response): Promise<Response> {
    try {
        const result = await getRepository(Post)
            .createQueryBuilder('post')
            .getMany();

        if (result.length > 0) {
            return response.status(200).json(result);
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: 'Could not retrieve posts list',
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}

/**
 * Return a single post by id
 *
 * @author Julien Guillot
 * @since 26-OCT-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function getPostById(request: Request, response: Response): Promise<Response> {
    try {
        const result = await getRepository(Post)
            .createQueryBuilder('post')
            .where('post.id = :id', { id: request.params.id })
            .getOne();

        if (result) {
            return response.status(200).json(result);
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: `Could not retrieve post with id: ${ request.params.id }`,
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}

/**
 * Insert a new post into database
 *
 * @author Julien Guillot
 * @since 26-OCT-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function createPost(request: Request, response: Response): Promise<Response> {
    try {
        const post = new Post().populate(request.body);

        const result = await getRepository(Post)
            .createQueryBuilder('post')
            .insert()
            .values([ post ])
            .returning(['id'])
            .execute();

        if (result.raw > 0) {
            return response.status(201).json(result.generatedMaps[0]);
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: 'Could not create post',
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}

/**
 * Update a post based on his id
 *
 * @author Julien Guillot
 * @since 26-OCT-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function updatePost(request: Request, response: Response): Promise<Response> {
    try {
        const post = new Post().populate(request.body);

        const result = await getRepository(Post)
            .createQueryBuilder('post')
            .update(post)
            .where('post.id = :id', { id: request.params.id })
            .returning(['id'])
            .execute();

        if (result.raw > 0) {
            return response.status(200).json(result.generatedMaps[0]);
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: `Could not update post with id: ${ request.params.id }`,
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}

/**
 * Delete a post based on his id
 *
 * @author Julien Guillot
 * @since 27-OCT-2019
 * @version 0.0.1
 *
 * @returns A promise containing informations about request status
 */
export async function deletePost(request: Request, response: Response): Promise<Response> {
    try {
        const result = await getRepository(Post)
            .createQueryBuilder('post')
            .delete()
            .where('post.id = :id', { id: request.params.id })
            .execute();

        if (result.raw > 0) {
            return response.status(200).json({ id: request.params.id });
        } else {
            return response.sendStatus(204);
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            return response.status(500).json({
                error: `Could not delete post with id: ${ request.params.id }`,
                message: error.message
            });
        } else {
            return response.sendStatus(500);
        }
    }
}
