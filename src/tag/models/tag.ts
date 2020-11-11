import { Entity, PrimaryGeneratedColumn, Column,model } from '@appolo/typeorm';

@Entity('tag')
@model()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

}
