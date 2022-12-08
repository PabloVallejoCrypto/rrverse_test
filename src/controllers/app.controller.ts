import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataInputDTO } from 'src/types/inputs/data.dto';
import { DataOutputDTO } from 'src/types/outputs/data.output';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Post()
  async getData(
    //Recogemos los datos del body con la etiqueta Body() y compobamos su tipo
    @Body() input: DataInputDTO,
  ): Promise<DataOutputDTO> {

    return this.appService.getData(input);
  }
}
