import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiHeader({
  name: 'apiKey',
  description: 'Api secret to access protected content',
})
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns a list of users.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async index(@Query() paginationQuery: PaginationQueryDto): Promise<User[]> {
    return await this.usersService.index(paginationQuery);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns a specific user data.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async show(@Param('id') id: string): Promise<User> {
    return await this.usersService.show(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Updates a specific user data.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Deletes a specific user.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> {
    await this.usersService.destroy(id);
  }
}
