import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from '../auth/dto/create-user.dto';
import { LoginUserDTO } from '../auth/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(createUser: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    let registerUser = {
      ...createUser,
      password: hashedPassword,
    };
    return await this.userRepository.create(registerUser);
  }

  async login(loginUserDTO: LoginUserDTO) {
    const user = await this.userRepository.findOne({
      where: { name: loginUserDTO.name },
    });
    if (!user)
      throw new NotFoundException(
        `No user found for name: ${loginUserDTO.name}`,
      );

    const isPasswordValid = await bcrypt.compare(
      loginUserDTO.password,
      user.password,
    );

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async validateJwtUser(userId: number): Promise<{ id: number }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User not found`);
    return { id: +user.id };
  }
}
