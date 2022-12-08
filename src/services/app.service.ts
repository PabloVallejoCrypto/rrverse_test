import { Injectable } from '@nestjs/common';
import { PostEntity } from 'src/databases/entities/post.entity';
import { UserEntity } from 'src/databases/entities/user.entity';
import { DataInputDTO } from 'src/types/inputs/data.dto';
import { DataOutputDTO } from 'src/types/outputs/data.output';

import * as fs from "fs";

@Injectable()
export class AppService {
  //Respuesta básica para el GET
  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  //Tratado de datos
  async getData(input: DataInputDTO): Promise<DataOutputDTO> {
    //Separamos los usuarios de los posts
    const users = input.users;
    const posts = input.posts;

    //Creamos el objeto de respuesta con el formato bueno
    const goodObject: DataOutputDTO = { users: [], posts: [] };

    //Generamos el array de las entidades user
    for (const user of users) {
      const newEntity: UserEntity = new UserEntity();
      
      newEntity.id = user[0];
      newEntity.name = user[1];
      newEntity.lastName = user[2];
      newEntity.email = user[3];
      newEntity.age = user[4];

      //Añadimos la entidad al objeto final
      goodObject['users'].push(newEntity);
    }

    //Generamos el array de las entidades post
    for (const post of posts) {
      const newEntity: PostEntity = new PostEntity();
      
      newEntity.userId = post[0];
      newEntity.title = post[1];
      newEntity.content = post[2];
      newEntity.createdAt = post[3];
      newEntity.published = post[4];

      //Añadimos la entidad al objeto final
      goodObject.posts.push(newEntity);
    }

    //Se imprimen los datos en output.json
    fs.writeFileSync("./src/output.json", JSON.stringify(goodObject), "utf-8");

    //Comprobamos que los datos están en output.json
    //console.log(fs.readFileSync("./src/output.json", "utf-8"));

    //Los devolvemos con la llamada
    return goodObject;
  }
}
