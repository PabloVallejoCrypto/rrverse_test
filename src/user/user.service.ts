import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/databases/entities/user.entity';
import { UserRepository } from 'src/databases/repositories/user.repository';
import { InsertResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UserRepository,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne({ where: { id }, relations: ["posts"] });
  }

  async getALl(): Promise<any> {
    return this.usersRepository.getAll();
  }

  async createUser(userData: UserEntity): Promise<UserEntity> {
    const entity: UserEntity = this.usersRepository.create(userData);
    return await this.usersRepository.save(entity);
  }

  async createUserBatch(usersData: UserEntity[]): Promise<InsertResult> {
    return await this.usersRepository.insert(usersData);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async init(): Promise<boolean> {
    await this.usersRepository.init();

    return true;
  }

  async deleteAll(): Promise<boolean> {
    await this.usersRepository.deleteAll();

    return true;
  }
}