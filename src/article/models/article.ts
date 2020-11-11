import { model,Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate } from '@appolo/typeorm';
import { User } from '../../user/models/user';
import { Comment } from './comment';

@Entity('article')
@model()
export class Article {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({default: ''})
  description: string;

  @Column({default: ''})
  body: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date;
  }

  @Column('simple-array')
  tagList: string[];

  @ManyToOne(type => User, user => user.articles)
  author: User;

  @OneToMany(type => Comment, comment => comment.article, {eager: true})
  @JoinColumn()
  comments: Comment[];

  @Column({default: 0})
  favoritesCount: number;
}
