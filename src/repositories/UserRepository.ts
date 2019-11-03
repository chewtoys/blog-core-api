import { EntityRepository, Repository, InsertResult } from 'typeorm';

import { User } from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {

    /**
     * Return all enabled users
     *
     * @author Julien Guillot
     * @since 01-NOV-2019
     * @version 0.0.1
     *
     * @returns A list of Users
     */
    public findAll(): Promise<User[]> {
        return this.createQueryBuilder('user')
            .where('user.accountStatus = :status', { status: 'enabled' })
            .getMany();
    }

    /**
     * Return all users matching provided filters
     *
     * @author Julien Guillot
     * @since 01-NOV-2019
     * @version 0.0.1
     *
     * @param filters Object containing status and roles filters
     *
     * @returns A list of users matching filters
     */
    public findAllByFilters(filters: any): Promise<User[]> {
        const request =  this.createQueryBuilder('user')
            .leftJoin('user.roles', 'roles');

        if (filters.status) {
            request.andWhere('user.accountStatus = :status', { status: filters.status });
        }

        if (filters.roles) {
            request.andWhere('roles.name IN (:...roles)', { roles: filters.roles })
        }

        return request.getMany();
    }

    /**
     * Return a enabled user based on id
     *
     * @author Julien Guillot
     * @since 01-NOV-2019
     * @version 0.0.1
     *
     * @returns A user or undefined if there is no user matching id.
     */
    public findOneById(id: number): Promise<User|undefined> {
        return this.createQueryBuilder('user')
            .where('user.id = :id', { id: id })
            .andWhere('user.accountStatus = :status', { status: 'enabled' })
            .getOne();
    }

    /**
     * Insert a new user in database only if it does not exist
     *
     * @author Julien Guillot
     * @since 03-NOV-2019
     * @version 0.0.1
     *
     * @param user User to insert
     *
     * @return Insertion result when insertion was successful, undefined otherwise
     */
    public async insertUser(user: User): Promise<User|undefined> {
        const userExist = await this.createQueryBuilder('user')
            .where('user.secret = :secret', { secret: user.secret })
            .getOne();

        if (!userExist) {
            return this.save(user);
        }
    }

    /**
     * Update a user only if it exist
     *
     * @author Julien Guillot
     * @since 03-NOV-2019
     * @version 0.0.1
     *
     * @param user User to update
     *
     * @return Insertion result when update was successful, undefined otherwise
     */
    public async updateUser(user: User): Promise<User|undefined> {
        const userExist = await this.createQueryBuilder('user')
            .where('user.id = :id', { id: user.id })
            .getOne();

        if(userExist) {
            return this.save(user);
        }
    }
}

export { UserRepository };
