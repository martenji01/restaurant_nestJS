import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { DishModule } from './dish/dish.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

console.log({conn: process.env.DB_CONNECTION})

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION),
    OrderModule,
    DishModule]
})
export class AppModule {}
