import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
