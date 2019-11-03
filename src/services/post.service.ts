import { getRepository } from "typeorm";
import { Post } from "../models/Post";

export class PostService {
    /**
     * Get list of all posts
     *
     * @returns { Array } Return an array of Post object
     */
    public async getPosts(): Promise<Post[]> {
        return await getRepository(Post)
            .createQueryBuilder("post")
            .getMany();
    }

    /**
     * Get a single post by id
     *
     * @param { number } id - Id of the post to retrieve
     * @returns { Post|undefined } Return a Post object when one is found, or return undefined when nothing is found
     */
    public async getPostById(id: number): Promise<Post | undefined> {
        await getRepository(Post)
            .createQueryBuilder("post")
            .where("user.id = :id", { id })
            .getOne();

        return undefined;
    }

    /**
     * Create a post
     *
     * @param { Post } post - Post to create
     * @returns { boolean } true when post was created, false otherwise
     */
    public async createPost(post: Post): Promise<any> {
        await getRepository(Post)
            .createQueryBuilder()
            .insert()
            .values(post);

        // TODO: Return boolean to inform user + log for debug
    }

    /**
     * Update a post
     *
     * @param { Post } post - Post to update
     * @returns { boolean } true when post was updated, false otherwise
     */
    public async updatePost(post: Post): Promise<any> {
        await getRepository(Post)
            .createQueryBuilder()
            .update()
            .set(post)
            .where("id = :id", { id: post.id })
            .execute();

        // TODO: Return boolean to inform user + log for debug
    }

    /**
     * Delete a post
     *
     * @param { Post } post - Post to delete
     * @returns { boolean } true when post was deleted, false otherwise
     */
    public async deletePost(post: Post): Promise<any> {
        await getRepository(Post)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: post.id })
            .execute();

        // TODO: Return boolean to inform user + log for debug
    }
}
