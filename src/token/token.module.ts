import { UsersModule } from './../user/user.module';
import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [],
  providers: [TokenService, AuthService],
  exports: [TokenService],
})
export class TokenModule {}
