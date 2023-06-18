import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { UploadDataDto } from './dtos';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async upload(dto: UploadDataDto): Promise<void> {
    await this.prisma.dataEntry.create({
      data: {
        ...dto,
      },
    });
  }

  async getDevices() {
    return await this.prisma.dataEntry.groupBy({
      by: ['deviceId'],
      orderBy: {
        _max: {
          deviceId: 'asc',
        },
      },
    });
  }

  async getDataForDevice(deviceId: number) {
    return await this.prisma.dataEntry.findMany({
      where: {
        deviceId: deviceId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        humidity: true,
        altitude: true,
        pressure: true,
        temperature: true,
      },
    });
  }

  async getDatesForDevice(deviceId: number) {
    return (
      await this.prisma.dataEntry.groupBy({
        by: ['createdAt'],
        where: {
          deviceId: deviceId,
        },
        orderBy: {
          _max: {
            createdAt: 'asc',
          },
        },
      })
    ).map((device) => device.createdAt);
  }
}
