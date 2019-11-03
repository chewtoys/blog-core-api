import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    // Content relative roles
    // POST_READ
    // POST_WRITE
    // POST_DELETE
    // POST_UPDATE
    // POST_PUBLISH
}
