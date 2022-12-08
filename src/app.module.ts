import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

import { ConfigurationModule } from './configuration/configuration.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserRepository } from './databases/repositories/user.repository';
import { PostModule } from './post/post.module';
import { PostRepository } from './databases/repositories/post.repository';
import { PostService } from './post/post.service';
import { UserEntity } from './databases/entities/user.entity';
import { PostEntity } from './databases/entities/post.entity';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: "data",
        entities: [
          UserEntity,
          PostEntity
        ],
        synchronize: false,
        autoSchemaSync: true,
        connectTimeout: 50000,
      })
    }),
    UserModule,
    PostModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    UserService,
    PostService,
    UserRepository,
    PostRepository
  ],
})
export class AppModule {}
