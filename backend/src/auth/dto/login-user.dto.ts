import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty({ example: '1' })
  id: string;
  @ApiProperty({ example: '123' })
  password: string;
}
