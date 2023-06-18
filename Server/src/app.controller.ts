import { Get, Controller, Render } from '@nestjs/common';
import { UploadService } from './upload/upload.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private uploadService: UploadService) {}

  @ApiExcludeEndpoint()
  @Get()
  @Render('index')
  async root() {
    return { devices: await this.uploadService.getDevices() };
  }
}
