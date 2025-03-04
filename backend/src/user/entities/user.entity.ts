import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  id: string;

  @Column
  login: string;

  @Column
  table: string;

  @Column
  password: string;
}
