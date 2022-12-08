import { PostEntity } from "src/databases/entities/post.entity";
import { UserEntity } from "src/databases/entities/user.entity";

export class DataOutputDTO {
    users: UserEntity[];

    posts: PostEntity[];
}