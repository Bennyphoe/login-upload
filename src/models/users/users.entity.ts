import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"
import { File } from "../files/files.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @OneToMany(() => File, file => file.sender)
    sentImages: File[]

    @OneToMany(() => File, file => file.receiver)
    receivedImages: File[]
}