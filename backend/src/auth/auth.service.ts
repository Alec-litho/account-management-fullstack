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
import { User } from 'src/user/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(createUser: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    console.log(createUser);
    let registerUser = {
      ...createUser,
      password: hashedPassword,
    };
    const account = await this.userRepository.create(registerUser);
    return {
      account,
      accessToken: this.jwtService.sign({ userId: account.id }),
    };
  }

  async login(loginUserDTO: LoginUserDTO) {
    const user = await this.userRepository.findOne({
      where: { id: loginUserDTO.id },
    });
    if (!user)
      throw new NotFoundException(`No user found for id: ${loginUserDTO.id}`);

    const isPasswordValid = await bcrypt.compare(
      loginUserDTO.password,
      user.password,
    );

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    return user;
  }

  async validateJwtUser(userId: number): Promise<{ id: number }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User not found`);
    return { id: +user.id };
  }
}
