import { Entity, Column } from 'typeorm';

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
}
