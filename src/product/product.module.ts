import { UsersModule } from './../user/user.module';
import { CategoryModule } from './../category/category.module';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TokenModule, forwardRef(() => CategoryModule), UsersModule],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
