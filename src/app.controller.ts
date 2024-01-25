import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Get } from './core/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get({
    path: '',
    description: 'App root',
    model: null,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
