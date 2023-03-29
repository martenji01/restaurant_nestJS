import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { DishModule } from './dish/dish.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongodbConfigService } from './config/mongoDb.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
    DishModule,
    AuthModule,
    UsersModule]
})



export class AppModule {}
