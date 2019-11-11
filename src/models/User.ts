import {
    Column,
    Entity,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinTable,
    AfterLoad,
} from "typeorm";
import Container from "typedi";

import { Image } from "./Image";
import { Role } from "./Role";
import { UserService } from "../services/UserService";
import { AbstractModel } from "../helpers/class/AbstractModel";
import { Property } from "../helpers/decorators/Property";

@Entity()
export class User extends AbstractModel {
    @Property()
    @PrimaryGeneratedColumn()
    public id: number;

    @Property()
    @Column()
    public name: string;

    @Property()
    @Column()
    public email: string;

    @Property()
    @Column()
    public password: string;

    @Property()
    @Column({ unique: true })
    public secret: string;

    @Property()
    @Column()
    public accountStatus: string;

    @Property()
    @OneToOne((type) => Image)
    public avatar?: Image;

    @Property()
    @ManyToMany((type) => Role)
    @JoinTable()
    public roles: Role[];

    /**
     * Normalize object by injecting values when property is empty
     *
     * @author Julien Guillot
     * @since 03-NOV-2019
     * @version 0.0.1
     */
    @AfterLoad()
    normalizeObject() {
        Container.get(UserService).normalizeData(this);

        return this;
    }
}
