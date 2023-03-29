import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { DishModule } from './dish/dish.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongodbConfigService } from './config/mongoDb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongodbConfigService,
    }),
    //MongooseModule.forRoot(process.env.DB_CONNECTION),
    OrderModule,
    DishModule]
})



export class AppModule {}
