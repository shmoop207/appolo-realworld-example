import {model, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from '@appolo/typeorm';
import { Article } from './article';
import {User} from "../../user/models/user";

@Entity()
@model()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date;

  @ManyToOne(type => Article, article => article.comments)
  article: Article;
  @ManyToOne(type => User )
  author: User;
}
