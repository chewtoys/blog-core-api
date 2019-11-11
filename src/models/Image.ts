import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./User";
import { Property } from "../helpers/decorators/Property";
import { AbstractModel } from "../helpers/class/AbstractModel";

@Entity()
export class Image extends AbstractModel {
    @Property()
    @PrimaryGeneratedColumn()
    public id: number;

    @Property()
    @Column()
    public name: string;

    @Property()
    @Column()
    public path: string;

    @Property()
    @Column()
    public description: string;

    @Property()
    @Column()
    public creationDate: Date;

    @Property()
    @Column()
    public mimeType: string;

    @Property()
    @Column()
    public width: number;

    @Property()
    @Column()
    public height: number;

    @Property()
    @ManyToOne((type) => User)
    public createdBy: User;

    constructor(props?: any) {
        super(props);
    }
}
