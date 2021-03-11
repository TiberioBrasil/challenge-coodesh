import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiServicesService } from 'src/api-services/api-services.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, HttpModule],
  controllers: [UsersController],
  providers: [UsersService, ApiServicesService],
  exports: [UsersService],
})
export class UsersModule {}
