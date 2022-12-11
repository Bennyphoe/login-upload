import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    caption: string

    @Column()
    name: string

    @Column()
    date: Date

    @Column()
    userId: number
    @ManyToOne(() => User, user => user.images)
    @JoinColumn({name: 'userId'})
    user: User
}