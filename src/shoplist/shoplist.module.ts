import { Module } from '@nestjs/common';
import { TokenModule } from 'src/token/token.module';
import { ShoplistService } from './shoplist.service';
import { ShoplistController } from './shoplist.controller';

@Module({
  imports: [TokenModule],
  controllers: [ShoplistController],
  providers: [ShoplistService],
  exports: [ShoplistService],
})
export class ShoplistModule {}
