import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Model } from '../helpers/interfaces/Model';
import { Image } from './Image';
import { User } from './User';
import { ProtectedContent } from '../helpers/class/ProtectedContent'

@Entity()
export class Post extends ProtectedContent implements Model {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public content: string;

    @ManyToOne((type) => User)
    public createdBy: User;

    @Column()
    public creationDate: Date;

    @ManyToOne((type) => User)
    public updatedBy: User;

    @Column()
    public updatedOn: Date;

    @ManyToOne((type) => Image)
    public image: Image;

    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    populate(data: any): this {
        this.title = data.title;
        this.content = data.content;
        this.createdBy = new User().populate(data.createdBy);
        this.creationDate = new Date(data.creationDate);
        this.updatedBy = new User().populate(data.updatedBy);
        this.image = new Image().populate(data.image);

        return this;
    }

    /**
     * @inheritdoc
     */
    export() {
        throw new Error("Method not implemented.");
    }
}
