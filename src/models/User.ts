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
import { Model } from "../helpers/interfaces/Model";
import { UserService } from "../services/UserService";

@Entity()
export class User implements Model {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column({ unique: true })
    public secret: string;

    @Column()
    public accountStatus: string;

    @OneToOne((type) => Image)
    public avatar?: Image;

    @ManyToMany((type) => Role)
    @JoinTable()
    public roles: Role[];

    /**
     * @inheritdoc
     */
    populate(data: any): this {
        return Object.assign(Container.get(UserService).getColumns(), data);
    }

    /**
     * @inheritdoc
     */
    export() {
        throw new Error("Method not implemented.");
    }

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
