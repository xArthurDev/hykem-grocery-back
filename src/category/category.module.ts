import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TokenModule } from './../token/token.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    TokenModule,
    UsersModule,
    JwtModule.register({}),
    forwardRef(() => TokenModule),
    ProductModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
