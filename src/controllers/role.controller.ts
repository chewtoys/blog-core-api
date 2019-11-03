import { Request, Response } from "express";
import log from "loglevel";
import { getRepository } from "typeorm";

import { Role } from "../models/Role";

/**
 * Get all the roles
 * 
 * @author Julien Guillot
 * @since 26-OCT-2019
 * @version 0.0.1 
 */
export function getRoles(request: Request, response: Response) {
    getRepository(Role)
        .find()
        .then((results) => {
            if (results.length > 0) {
                return response.status(200).json({
                    roles: results,
                });
            } else {
                log.debug(
                    "DEBUG:", 
                    "No role found in database. Page will not reload."
                );
                return response.sendStatus(204);
            }
        })
        .catch((error) => {
            return response.status(500).json({
                description: "Unable to retreive roles.",
                message: error.message,
            });
        });
};

/**
 * Retrieve a single Role by id
 */
export function getRoleById(request: Request, response: Response) {
    getRepository(Role)
        .findOne(request.params.id)
        .then((result) => {
            if (result) {
                return response.status(200).json(result);
            } else {
                log.debug(
                    'DEBUG:',
                    `No role found with id: ${request.params.id}. Page will not reload.`
                );
                return response.sendStatus(204);
            }
        })
        .catch((error) => {
            return response.status(500).json({
                description: `Unable to retrieve role with id: ${request.params.id}.`,
                message: error.message,
            });
        });
};

/**
 * Create a new Role
 */
export function createRole(request: Request, response: Response) {
    const role = getRepository(Role).create(request.body);
    
    getRepository(Role).save(role).then((result) => {
        log.debug(result);
    })
};

/**
 * Update existing Post
 */
export const updatePost = (request: Request, response: Response) => {
    // const post = new Post(request.body);
    // PostService.updatePost(post, request.params.id)
    //     .then(() => {
    //         log.debug("Post updated.");
    //         return response.sendStatus(200);
    //     })
    //     .catch((error) => {
    //         return response.status(500).json({
    //             description: "Post update failed.",
    //             message: error.message,
    //         });
    //     });
};

/**
 * Delete Post
 */
export const deletePost = (request: Request, response: Response) => {
    // PostService.deletePost(request.params.id)
    //     .then(() => {
    //         log.debug("Post deleted");
    //         return response.sendStatus(200);
    //     })
    //     .catch((error) => {
    //         return response.status(500).json({
    //             description: "Post deletion failed.",
    //             message: error.message,
    //         });
    //     });
};
