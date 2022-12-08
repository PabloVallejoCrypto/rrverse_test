import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

console.log(process.env.DATABASE_HOST);

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_POST),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: 'database-1',
        entities: [  
        ],
        synchronize: true,
        connectTimeout: 50000,
      }),
    ],
    controllers: [],
    providers: [],
  })
export class DatabasesModule {}


//admin
//hfhgSDF7hHgGz7TDN49t