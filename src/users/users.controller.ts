import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserListDto } from './dto/get-user-list.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('UsersController')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async getUsers(@Query('name') name?: string): Promise<User[]> {
    return await this.usersService.findAll(name);
  }
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get('/getAllUserList')
  async getAllUserList(@Req() request): Promise<GetUserListDto> {
    const user = await this.usersService.getAllUserList(request.user.userId);
    if (!user) throw new NotFoundException();
    return user;
  }

  @ApiOkResponse({ type: User, isArray: false })
  @ApiNotFoundResponse()
  @Get(':id')
  async getUsersById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.createUser(body);
  }
}
