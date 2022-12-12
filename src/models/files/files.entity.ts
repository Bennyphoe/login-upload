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
    senderId: number
    @ManyToOne(() => User, user => user.sentImages)
    @JoinColumn({name: 'senderId'})
    sender: User

    @Column()
    receiverId: number
    @ManyToOne(() => User, user => user.receivedImages)
    @JoinColumn({name: 'receiverId'})
    receiver: User
}