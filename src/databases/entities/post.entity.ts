import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createdAt: string;

  @Column()
  published: boolean;

  @Column()
  userId: string;ç

  @ManyToOne(() => UserEntity, (user) => user.posts, { nullable: true })
  user?: UserEntity;
}
