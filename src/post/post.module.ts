import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/databases/entities/post.entity';
import { PostRepository } from 'src/databases/repositories/post.repository';
import { PostService } from './post.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
    ],
    controllers: [],
    providers: [
        PostService,
        PostEntity,
        PostRepository
    ],
})
export class PostModule {}