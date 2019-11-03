import supertest from 'supertest';
import { getRepository, createConnection, getConnection } from 'typeorm';

import { app as server } from '../../src/index';
import { User } from '../../src/models/User';

// TODO: Maybe we can user faker here
const USER_A = {
    name: 'Toto',
    email: 'toto@toto.com',
    password: 'mysup3rp@ssword',
    secret: 'shhhhhhh',
    accountStatus: 'enabled',
    roles: [],
};

const USER_B = {
    name: 'Titi',
    email: 'titi@titi.com',
    password: 'h@rdpassword',
    secret: 'abcd',
    accountStatus: 'disabled',
    roles: [],
};

// This user doesn't have a mandatory props (secret)
const USER_INVALID = {
    name: 'Titi',
    email: 'titi@titi.com',
    password: 'mysup3rp@ssword',
    accountStatus: 'disabled',
    roles: [],
};

const USER_UPDATED = {
    id: 1,
    name: 'Toto',
    email: 'toto@toto.com',
    password: 'mysup3rp@sswordh@sch@ng3d',
    secret: 'shhhhhhh',
    accountStatus: 'enabled',
    roles: ['I_HAVE_A_ROLE_NOW'],
}

async function loadFixtures() {
    try {
        await getRepository(User).save([ USER_A, USER_B ]);
    } catch (error) {
        throw error;
    }
}

describe('UserController test cases', () => {

    beforeEach(() => {
        return createConnection({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            synchronize: true,
            entities: [
                __dirname + '/../../src/models/**/*'
            ]
        })
    });

    afterEach(async () => {
        return getConnection().close();
    });

    describe('getUsers action', () => {
        it('Should return status code 200 when there is content', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return status code 204 when there is no content', (done) => {
            supertest(server)
                .get('/api/users')
                .expect(204)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return a json response when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return an array when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body).toBeInstanceOf(Array);

                    return done();
                });
        });

        it('Should contain at least one result when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body.length).toBeGreaterThan(0);

                    return done();
                });
        });

        it('Should not contain any result when status code is 204', (done) => {
            supertest(server)
                .get('/api/users')
                .expect(204, {}, done);
        });

        it('Should return an array of users when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body).toBeInstanceOf(Array);
                    expect(response.body[0]).toMatchObject(USER_A);

                    return done();
                })
        });
    });

    describe('getUsersByFilter action', () => {
        it('Should return status code 200 when there is content', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users/filter')
                .query({
                    status: 'disabled',
                })
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return status code 204 when there is no content', (done) => {
            supertest(server)
                .get('/api/users/filter')
                .query({
                    status: 'disabled',
                })
                .expect(204)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return a json response when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users/filter')
                .query({
                    status: 'disabled',
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return an array when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users/filter')
                .query({
                    status: 'disabled',
                })
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body).toBeInstanceOf(Array);

                    return done();
                });
        });

        it('Should contain at least one result when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users/filter')
                .query({
                    status: 'disabled',
                })
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body.length).toBeGreaterThan(0);

                    return done();
                });
        });

        it('Should not contain any result when status code is 204', (done) => {
            supertest(server)
                .get('/api/users/filter')
                .query({
                    status: 'disabled',
                })
                .expect(204, {}, done);
        });

        it('Should return an array of users when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users/filter')
                .query({
                    status: 'disabled',
                })
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body).toBeInstanceOf(Array);
                    expect(response.body[0]).toMatchObject(USER_B);

                    return done();
                })
        });
    });

    describe('getUserById action', () => {
        it('Should return status code 200 when there is a result', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users/1')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return status code 204 when there is no result', (done) => {
            supertest(server)
                .get('/api/users/1')
                .expect(204)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return a json response when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should contain only one result when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users/1')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    // Body does not contain more than one result
                    expect(response.body.length).toBeUndefined();

                    // Body contain something
                    expect(response.body.id).not.toBeUndefined();

                    return done();
                });
        });

        it('Should return empty body when status code is 204', (done) => {
            supertest(server)
                .get('/api/users/1')
                .expect(204, {}, done);
        });

        it('Should return an instance of User when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .get('/api/users/1')
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body).toMatchObject(USER_A);

                    return done();
                });
        });
    });

    describe('createUser action', () => {
        it('Should return status code 201 when a user was created', (done) => {
            supertest(server)
                .post('/api/users')
                .send(USER_A)
                .expect(201)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return status code 204 when user already exist', async (done) => {
            await loadFixtures();

            supertest(server)
                .post('/api/users')
                .send(USER_A)
                .expect(204)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return status code 500 when there is an error that prevent user creation', (done) => {
            supertest(server)
                .post('/api/users')
                .send(USER_INVALID)
                .expect(500)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should return a JSON response when status code is 201', (done) => {
            supertest(server)
                .post('/api/users')
                .send(USER_A)
                .expect(201)
                .expect('Content-Type', /json/)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should only return one result when status code is 201', (done) => {
            supertest(server)
                .post('/api/users')
                .send(USER_A)
                .expect(201)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    // Body does not contain more than one result
                    expect(response.body.length).toBeUndefined();

                    // Body contain something
                    expect(response.body.id).not.toBeUndefined();

                    return done();
                });
        });

        it('Should return an empty body when status code is 204', async (done) => {
            await loadFixtures();

            supertest(server)
                .post('/api/users')
                .send(USER_A)
                .expect(204)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    // Body does not contain more than one result
                    expect(response.body.length).toBeUndefined();

                    // Body doesn't contain anything
                    expect(response.body.id).toBeUndefined();

                    return done();
                });
        });

        it('Should return the newly created user when status code is 201', (done) => {
            supertest(server)
                .post('/api/users')
                .send(USER_A)
                .expect(201)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body).toMatchObject(USER_A);

                    return done();
                });
        });
    });

    describe('updateUser action', () => {
        it('Should return status code 200 when the user was updated', async (done) => {
            await loadFixtures();

            supertest(server)
                .put('/api/users/1')
                .send(USER_UPDATED)
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        done(error);
                    }

                    done();
                });
        });

        it('Should return status code 204 when no user where updated', (done) => {
            supertest(server)
                .put('/api/users/1')
                .send(USER_UPDATED)
                .expect(204)
                .end((error, response) => {
                    if (error) {
                        done(error);
                    }

                    done();
                });
        });

        it('Should return a JSON response when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .put('/api/users/1')
                .send(USER_UPDATED)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    return done();
                });
        });

        it('Should only return one result when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .put('/api/users/1')
                .send(USER_UPDATED)
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body.length).toBeUndefined();

                    expect(response.body.id).toBeDefined();

                    return done();
                });
        });

        it('Should return an empty body when status code is 204', (done) => {
            supertest(server)
                .put('/api/users/1')
                .send(USER_UPDATED)
                .expect(204)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body.length).toBeUndefined();

                    expect(response.body.id).toBeUndefined();

                    return done();
                });
        });

        it('Should return the updated user when status code is 200', async (done) => {
            await loadFixtures();

            supertest(server)
                .put('/api/users/1')
                .send(USER_UPDATED)
                .expect(200)
                .end((error, response) => {
                    if (error) {
                        return done(error);
                    }

                    expect(response.body).toMatchObject(USER_UPDATED);

                    return done();
                });
        });
    });
});
