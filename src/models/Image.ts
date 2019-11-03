import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./User";
import { Model } from "../helpers/interfaces/Model";

@Entity()
export class Image implements Model {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public path: string;

    @Column()
    public description: string;

    @Column()
    public creationDate: Date;

    @Column()
    public mimeType: string;

    @Column()
    public width: number;

    @Column()
    public height: number;

    @ManyToOne((type) => User)
    public createdBy: User;

    /**
     * @inheritdoc
     */
    populate(data: any): this {
        return this;
        // throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    export() {
        throw new Error("Method not implemented.");
    }
}
