import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller()
export class UserController {
  constructor(
    private readonly usersService: UserService
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const response = await this.usersService.create();

    console.log("Response", response);
    return "response";
  }
}
