import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Login } from './login';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';

@ApiCreatedResponse()
@ApiUnauthorizedResponse()
@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ required: true, type: Login })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
