import { TokenModule } from 'src/token/token.module';
/* eslint-disable prettier/prettier */
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => TokenModule)],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
