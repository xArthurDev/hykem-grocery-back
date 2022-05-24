import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { TokenModule } from './token/token.module';
import { UsersModule } from './user/user.module';
import { ShoplistModule } from './shoplist/shoplist.module';

@Module({
  imports: [
    ShoplistModule,
    CategoryModule,
    AuthModule,
    UsersModule,
    TokenModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
