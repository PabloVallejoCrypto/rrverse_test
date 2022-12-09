import { Injectable } from '@nestjs/common';
import { PostEntity } from 'src/databases/entities/post.entity';
import { UserEntity } from 'src/databases/entities/user.entity';
import { DataInputDTO } from 'src/types/inputs/data.dto';
import { DataOutputDTO } from 'src/types/outputs/data.output';

import * as fs from "fs";
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  //Respuesta básica para el GET
  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  //Datos basicos
  async getAllData(): Promise<any> {
    return await this.userService.getALl();
  }
  //Borrar datos de la ddbb
  async deleteData(): Promise<any> {
    return await this.userService.deleteAll();
  }

  //Tratado de datos
  async getData(input: DataInputDTO): Promise<DataOutputDTO> {
    //Separamos los usuarios de los posts
    const users = input.users.slice(1);
    const posts = input.posts.slice(1);

    //Creamos los objetos de respuesta con el formato bueno
    const goodObject: DataOutputDTO = { users: [], posts: [] };

    //BUCLE PARA GENERAR EL ARCHIVO DE SALIDA CON EL FORMARO PEDIDO
    //Generamos el array de las entidades user
    for (const user of users) {
      const newEntity: UserEntity = new UserEntity();
      
      newEntity.uuid = user[0];
      newEntity.name = user[1];
      newEntity.lastName = user[2];
      newEntity.email = user[3];
      newEntity.age = user[4];

      //Añadimos la entidad al objeto final
      goodObject.users.push(newEntity);
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

    //Para comprobar que los datos están en output.json
    //console.log(fs.readFileSync("./src/output.json", "utf-8"));

    //Reset database
    await this.userService.deleteAll();
    await this.userService.init();

    
    //Cargar datos en users table
    await this.userService.createUserBatch(goodObject.users);

    //Cargar datos en posts table y su foreign key (no se puede con batch por su foreign key)
    for await (const post of goodObject.posts) {
      await this.postService.createPost(post);
    }

    //Ver resultados
    const actualUsers: UserEntity[] = await this.userService.findAll();
    const actualPosts: PostEntity[] = await this.postService.findAll();

    //Obtiene todas las tablas de golpe
    //const all = await this.userService.getALl();

    //Resultados genericos
    console.log(
      "Resultados de la base de datos", 
      actualUsers, actualPosts
    );

    //Resultados para comprobar que se obtienen sus relaciones
    console.log(
      "Resultados del usuario 5", 
      await this.userService.findOne(5)
    );

    //Los devolvemos con la llamada
    return goodObject;
  }
}
