import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/login-user.dto';
import { Auth } from '../auth/entities/auth.entity';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error, some of the fields are not provided',
  })
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDTO) {
    return await this.authService.register(createUserDto);
  }

  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error, some of the fields are not provided',
  })
  @ApiOkResponse({ type: User })
  @Post('/login')
  login(@Body() LoginUserDTO: LoginUserDTO) {
    return this.authService.login(LoginUserDTO);
  }
}
