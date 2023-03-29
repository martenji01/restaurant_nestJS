import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto) {
    const user = this.UserModel.create(createUserDto)
    return user;
  }

  findAll() {
    return this.UserModel.find();
  }

  findOne(id: string) {
    return this.UserModel.findById(id);
  }

  findOneReturnPassword(username: string) {
    return this.UserModel.findOne({username}).select('+password').lean();
  }

  findOneByUsername(username: string) {
    return this.UserModel.findOne({username});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto)
  }

  remove(id: string) {
    return this.UserModel.findByIdAndDelete(id)
  }
}
