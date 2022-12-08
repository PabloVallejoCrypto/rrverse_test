import { Injectable } from '@nestjs/common';
import { PostEntity } from 'src/databases/entities/post.entity';
import { PostRepository } from 'src/databases/repositories/post.repository';
import { InsertResult } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    private postsRepository: PostRepository,
  ) {}

  findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  findOne(id: number): Promise<PostEntity> {
    return this.postsRepository.findOne({ where: { id }, relations: ["user"] });
  }

  async createPost(postData: PostEntity): Promise<PostEntity> {
    return await this.postsRepository.save(postData);
  }

  async createUserBatch(postsData: PostEntity[]): Promise<InsertResult> {
    return await this.postsRepository.insert(postsData);
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}