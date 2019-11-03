import supertest from 'supertest';
import { createConnection, getConnection, getRepository } from 'typeorm';

import { app as server } from '../../src/index';
import { Post } from '../../src/models/Post';
import { User } from '../../src/models/User';
import { Image } from '../../src/models/Image';

/**
 * Load data into DB
 */
async function loadFixtures() {
    // new Repository<User>().create({

    // })
    const user = new User().populate({

    });
    const date = new Date('27-10-2019');
    const image = new Image().populate({

    });

    await getRepository(Post)
        .createQueryBuilder()
        .insert()
        .values([
            {
                title: '',
                content: '',
                createdBy: user,
                creationDate: date,
                updatedBy: user,
                updatedOn: date,
                image: image
            }
        ])
        .execute();
}

describe('PostController test cases', () => {

    /**
     * Initialize connection with memory db for each test.
     */
    beforeEach(() => {
        return createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            synchronize: true,
            entities: [
                __dirname + '/../../src/models/**/*'
            ]
        });
    });

    /**
     * Close connection after each test.
     */
    afterEach(() => {
        return getConnection().close();
    });

    describe('Get all posts action', () => {
        it('Should return status code 200 when there is content', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/posts')
                .expect(200)
                .then(() => {
                    return done();
                })
                .catch((error) => {
                    return done(error);
                });
        });
    });
});
