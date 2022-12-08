import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

import { DatabasesModule } from './databases/databases.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './databases/entities/user.entity';
import { PostEntity } from './databases/entities/post.entity';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './databases/repositories/user.repository';

@Module({
  imports: [
    /*
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [
        UserEntity,
        PostEntity,
        UserRepository
      ],
      synchronize: true,
      connectTimeout: 50000,
    }),
    UserModule,
    */
    ConfigurationModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
