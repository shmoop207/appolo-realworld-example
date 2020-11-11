import { Entity, PrimaryGeneratedColumn, Column,model } from "@appolo/typeorm";

@Entity('follows')
@model()
export class FollowsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followerId: number;

  @Column()
  followingId: number;

}
