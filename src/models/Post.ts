import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Image } from './Image';
import { User } from './User';
import { Property } from "../helpers/decorators/Property";
import { AbstractModel } from "../helpers/class/AbstractModel";

@Entity()
export class Post extends AbstractModel {
    @Property()
    @PrimaryGeneratedColumn()
    public id: number;

    @Property()
    @Column()
    public title: string;

    @Property()
    @Column()
    public content: string;

    @Property()
    @ManyToOne((type) => User)
    public createdBy: User;

    @Property()
    @Column()
    public creationDate: Date;

    @Property()
    @ManyToOne((type) => User)
    public updatedBy: User;

    @Property()
    @Column()
    public updatedOn: Date;

    @Property()
    @ManyToOne((type) => Image)
    public image: Image;

    constructor(props?: any) {
        super(props);
    }
}
