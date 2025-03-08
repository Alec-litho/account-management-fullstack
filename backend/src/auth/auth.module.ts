import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/user/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secretOrPrivateKey: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
