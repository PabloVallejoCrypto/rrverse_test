import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PostEntity {
  userId: string;

  @Column(() => String)
  title: string;

  @Column(() => String)
  content: string;

  @Column(() => String)
  createdAt: string;

  @Column(() => Boolean)
  published: boolean;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user?: UserEntity;
}
