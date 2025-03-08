import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id;

  @Column({
    type: DataType.STRING,
    defaultValue: 'Иванова И.И.',
  })
  fullName: string;

  @Column
  login: string;

  @Column
  tabNumber: string;

  @Column
  password: string;
}
