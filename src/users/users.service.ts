import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  async create(createUser: any) {
    console.log({createUser})
    const user = await this.UserModel.create(createUser)
    return user;
  }

  async findAll() {
    return await this.UserModel.find();
  }

  async findOne(id: string) {
    return await this.UserModel.findById(id);
  }

  async findOneReturnPassword(username: string) {
    return await this.UserModel.findOne({username}).select('+password').lean();
  }

  async findOneByUsername(username: string) {
    return await this.UserModel.findOne({username});
  }

  async update(id: string, updateUserDto: any) {
    return await this.UserModel.findByIdAndUpdate(id, updateUserDto)
  }

  async remove(id: string) {
    return await this.UserModel.findByIdAndDelete(id)
  }
}
