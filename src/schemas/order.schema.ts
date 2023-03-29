import { HydratedDocument, SchemaTypes  } from 'mongoose';
import {Dish} from './dish.schema'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from './user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {

  @Prop({
    required: true
  })
  table: string;

  @Prop({
    type:[{
        qta:{type:Number},
        dish:{ type: [SchemaTypes.ObjectId], ref: 'Dish', required: true }
      }]
  })
  dishes: {
      qta: number; dish: Dish 
  }[];

  @Prop()
  creationDate: string;

  @Prop()
  deliveryDate: string;

  @Prop({type: SchemaTypes.ObjectId, ref: 'User', required: true} )
  sub: User

}

export const OrderSchema = SchemaFactory.createForClass(Order);