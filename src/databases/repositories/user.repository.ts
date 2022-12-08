import {DataSource, Repository, Table, TableForeignKey} from 'typeorm';
import {Injectable} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity>
{
    constructor(private dataSource: DataSource)
    {
        super(UserEntity, dataSource.createEntityManager());
    }

    async getAll(): Promise<any> {
        const response0 = await this.query(
            'SELECT * FROM user_entity'
        );
        const response1 = await this.query(
            'SELECT * FROM post_entity'
        );

        return [response0, response1];
    }

    async init(): Promise<boolean> {
        const response0 = await this.query(
            'CREATE TABLE IF NOT EXISTS user_entity(id int UNIQUE NOT NULL AUTO_INCREMENT, uuid varchar(36) UNIQUE NOT NULL, name varchar(36) NOT NULL, lastName varchar(36) NOT NULL, email varchar(36) NOT NULL, age int NOT NULL, PRIMARY KEY (id))'
        );

        const response1 = await this.query(
            'CREATE TABLE IF NOT EXISTS post_entity(id int UNIQUE NOT NULL AUTO_INCREMENT, userId varchar(36) NOT NULL, title varchar(100) NOT NULL, content varchar(1000) NOT NULL, createdAt varchar(36) NOT NULL, published INT(1) NOT NULL, PRIMARY KEY (id))'
        );

        //
        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.createForeignKey("post_entity", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["uuid"],
            referencedTableName: "user_entity",
            onDelete: "CASCADE"
        }));

        console.log("Creating");

        return true;
    }

    async deleteAll(): Promise<boolean> {
        const response1 = await this.query(
            'DROP TABLE post_entity'
        );

        const response0 = await this.query(
            'DROP TABLE user_entity'
        );

        console.log("Deleting");

        return true;
    }
}