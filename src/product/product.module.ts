import { CategoryModule } from './../category/category.module';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TokenModule, forwardRef(() => CategoryModule)],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
