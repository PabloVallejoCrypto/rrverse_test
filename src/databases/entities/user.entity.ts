import { Entity, Column, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @OneToMany(() => PostEntity, (post) => post.user, { nullable: true })
  posts?: PostEntity[]
}
