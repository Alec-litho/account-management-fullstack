import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Auth extends Model {
  @Column
  @ApiProperty()
  accessToken: string;
}
