import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [AuthModule, UsersModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
