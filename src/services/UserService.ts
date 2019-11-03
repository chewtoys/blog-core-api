import { Service } from "typedi";

import { User } from '../models/User';
import { getRepository, ObjectLiteral } from "typeorm";

@Service()
class UserService {

    /**
     * Normalize User model by providing default values when property is empty
     *
     * @author Julien Guillot
     * @since 01-NOV-2019
     * @version 0.0.1
     *
     * @param user User to normalize
     */
    public normalizeData(user: User) {
        if (!user.roles) {
            user.roles = [];
        }
    }

    /**
     * Return all entity columns
     *
     * @author Julien Guillot
     * @since 01-NOV-2019
     * @version 0.0.1
     *
     * @returns Entity columns
     */
    public getColumns(): ObjectLiteral {
        const columns = getRepository(User).metadata.propertiesMap;

        // remove values that comes by default
        for (const key in columns) {
            columns[key] = undefined;
        }

        return columns;
    }
}

export { UserService };
