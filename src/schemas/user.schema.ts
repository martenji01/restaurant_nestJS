import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, select: false})
  password: string;

  @Prop({ required: true, enum: ['admin', 'user'], default: 'user',})
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User);