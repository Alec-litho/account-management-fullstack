import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'Alec' })
  name: string;
  @ApiProperty({ example: 'opallitho@gmail.com' })
  login: string;
  @ApiProperty({ example: '123' })
  password: string;
  @ApiProperty({ example: '123' })
  tabNumber: string;
}
