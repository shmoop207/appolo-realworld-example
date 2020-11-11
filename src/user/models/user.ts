import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    JoinTable,
    ManyToMany,
    OneToMany,
    model,
} from '@appolo/typeorm';
import * as argon2 from 'argon2';
import {Article} from '../../article/models/article';

@Entity('user')
@model()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({default: ''})
    bio: string;

    @Column({default: ''})
    image: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    @ManyToMany(type => Article)
    @JoinTable()
    favorites: Article[];

    @OneToMany(type => Article, article => article.author)
    articles: Article[];
}
