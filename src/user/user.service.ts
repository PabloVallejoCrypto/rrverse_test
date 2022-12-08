import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/databases/entities/user.entity';
import { UserRepository } from 'src/databases/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UserRepository,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  create(): Promise<UserEntity[]> {
    return this.usersRepository.query('CREATE TABLE user');
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}