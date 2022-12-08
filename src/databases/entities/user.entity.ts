import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity()
export class UserEntity {
  @Column(() => String)
  id: string;

  @Column(() => String)
  name: string;

  @Column(() => String)
  lastName: string;

  @Column(() => String)
  email: string;

  @Column(() => String)
  age: number;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[]
}
