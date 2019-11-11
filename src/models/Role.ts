import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Property } from "../helpers/decorators/Property";
import { AbstractModel } from "../helpers/class/AbstractModel";

@Entity()
export class Role extends AbstractModel {
    @Property()
    @PrimaryGeneratedColumn()
    public id: number;

    @Property()
    @Column()
    public name: string;

    constructor(props?: any) {
        super(props);
    }

    // Content relative roles
    // POST_READ
    // POST_WRITE
    // POST_DELETE
    // POST_UPDATE
    // POST_PUBLISH
}
