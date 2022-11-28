import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptographyService } from 'src/cryptography/cryptography.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptographyService: CryptographyService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const decryptPass = this.cryptographyService.decryptAESfunction(
      user.password,
    );
    if (user && decryptPass === pass && user.isActive) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
