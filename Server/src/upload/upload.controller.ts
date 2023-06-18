import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadDataDto } from './dtos';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
@ApiTags('Data interaction')
@Controller('data')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @ApiBody({ type: UploadDataDto })
  @Post('upload')
  async uploadData(@Body() dto: UploadDataDto) {
    return await this.uploadService.upload(dto);
  }

  @Get('devices')
  async getDevices() {
    return await this.uploadService.getDevices();
  }

  @Get(':id')
  async getData(@Param('id') deviceId: number) {
    return await this.uploadService.getDataForDevice(deviceId);
  }

  @Get('dates/:id')
  async getDates(@Param('id') deviceId: number) {
    return await this.uploadService.getDatesForDevice(deviceId);
  }
}
