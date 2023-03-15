import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dish, DishDocument } from 'src/schemas/dish.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class DishService {
  constructor(@InjectModel(Dish.name) private DishModel: Model<DishDocument>) {}

  generateObjectId(id: string){
    try {
      const objectId = new Types.ObjectId(id)
      return objectId;
    } catch (error) {
      console.log({ ConvertToObjectId: error})
      return null
    }
     
  }

  async create(obj: object) {
    try {
      const dish = new this.DishModel(obj)
      await dish.save()
      return dish;
    } catch (error) {
      console.log({ CreationDishError: error})
      return { CreationDishError: error}
    }
  }

  async findAll() {
    try {
      return await this.DishModel.find().exec();
    } catch (error) {
      console.log({ErrorListDishes: error})
      return {ErrorListDishes: error}
    }
  }

  async findOne(id: string) {
    try {
      const objectId = this.generateObjectId(id);
      if(!objectId)
        throw new HttpException('Id not valid!', 409);
      const dish = await this.DishModel.findById(objectId);
      if(!dish)
        throw new HttpException('Dish not found!', 404);

    } catch (error) {
        console.log({ FindDishError: error})
        return { FindDishError: error}
    }
    
  }

  async update(id: string, body: object) {
    try {
      const objectId = this.generateObjectId(id);
      if(!objectId)
        throw new HttpException('Id not valid!', 409);
      const dish = await this.DishModel.findByIdAndUpdate(objectId, body)
      if(!dish)
        throw new HttpException('Dish not found!', 404);
      return dish;
    } catch (error) {
      console.log({ UpdateDIshError: error})
        return { UpdateDIshError: error}
    }
    
  }

  async deleteOne(id: string): Promise<object>{
    try {
      const objectId = this.generateObjectId(id);
      if(!objectId)
        throw new HttpException('Id not valid!', 409);
      const dish = await this.DishModel.deleteOne({ObjectId: objectId})
      if(!dish)
        throw new HttpException('Dish not found!', 404);
      return dish;
    } catch (error) {
      console.log({ DeleteDishError: error})
        return { DeleteDishError: error}
    }
    
  }
}

