import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptographyService } from 'src/cryptography/cryptography.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private cryptographyService: CryptographyService,
  ) {}
  async findAll(name?: string): Promise<User[]> {
    return !!name
      ? await this.userRepository.findBy({ name: name })
      : await this.userRepository.find();
  }
  async findById(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!!user) return user;
    else throw new Error('Usuário nâo encontrado');
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = this.cryptographyService.encryptAESfunction(
      createUserDto.password,
    );
    const newUser = { ...createUserDto };
    return await this.userRepository.save(newUser);
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    return await this.userRepository.save({ ...user, ...updateUserDto });
  }
  async removeUser(id: number): Promise<User> {
    const user = await this.findById(id);
    // eslint-disable-next-line prefer-const
    let removeUser = user;
    removeUser.isActive = false;
    return await this.userRepository.save({ ...user, ...removeUser });
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!!user) return user;
    else throw new Error('Usuário nâo encontrado');
  }
}
