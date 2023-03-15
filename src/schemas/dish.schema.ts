import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type DishDocument = HydratedDocument<Dish>;

@Schema()
export class Dish {
  @Prop()
  name: String;

  @Prop()
  price: number;

}

export const DishSchema = SchemaFactory.createForClass(Dish);