import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from 'src/databases/entities/user.entity';
import { UserRepository } from 'src/databases/repositories/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [],
    providers: [
        UserService,
        UserEntity,
        UserRepository
    ],
})
export class UserModule {}