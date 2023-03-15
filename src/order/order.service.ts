import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import { Model, Types } from 'mongoose';
import { Dish } from 'src/schemas/dish.schema';
import * as moment from "moment";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private OrderModel: Model<OrderDocument>) {}

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
      const todayDate = moment().toISOString();
      const bodyOrder = {
        ...obj,
        creationDate: todayDate,
        deliveryDate: todayDate
      }
      
      if(Object.prototype.hasOwnProperty.call(obj, 'deliveryDate'))
        bodyOrder.deliveryDate = moment(obj['deliveryDate']).toISOString();
      
      const order = new this.OrderModel(bodyOrder)
      await order.save()
      return order;
    } catch (error) {
      console.log({CreateOrderError: error})
      return {CreateOrderError: error}
    }
    
  }

  async findAll() {
    try {
    return await this.OrderModel.find().exec();
      
    } catch (error) {
      console.log({FindOrdersError: error})
      return {FindOrdersError: error}
    }
  }

  async findOrdersByTable(table: string) {
    try {
      const listOrders = await this.OrderModel.find({table: table}).sort([['deliveryDate', 1]]);
      if(!listOrders)
        throw new HttpException('Table id not valid!', 409);
      if(listOrders.length < 1)
        throw new HttpException('Table has no orders!', 404);
    } catch (error) {
      console.log({TableOrdersError: error})
      return {TableOrdersError: error}
    }
    return 
  }

  async findOne(id: string) {
    try {
      const objectId = this.generateObjectId(id);
      if(!objectId)
          throw new HttpException('Id not valid!', 409);
      const order = await this.OrderModel.findById(objectId).populate('dishes.dish');
      if(!order)
          throw new HttpException('Order not found!', 404);
    } catch (error) {
      console.log({FindOrderError: error})
      return {FindOrderError: error}
    }
  }

  async getOrderTotalPrice(id: string){
    try {
      const order = await this.findOne(id);
    if(!order || Object.prototype.hasOwnProperty.call(order, 'FindOrderError'))
        throw new HttpException('Order not found!', 404);
    return order['dishes'].reduce((total: number, el: { qta: number, dish: Dish})=>{
      total+= el.dish[0].price * el.qta
      return total
    }, 0)
    } catch (error) {
      console.log({GetOrderTotal: error})
      return {GetOrderTotal: error}
    }
  }

  async update(id: string, body: object) {
    try {
      const objectId = this.generateObjectId(id);
      if(!objectId)
          throw new HttpException('Id not valid!', 409);
      const order = await this.OrderModel.findByIdAndUpdate(objectId, body)
      if(!order)
            throw new HttpException('Order not found!', 404);
      return order;
    } catch (error) {
      console.log({UpdateOrderError: error})
      return {UpdateOrderError: error}
    }
    
  }

  async deleteOne(id: string): Promise<object>{
    try {
      const objectId = this.generateObjectId(id);
      if(!objectId)
          throw new HttpException('Id not valid!', 409);
      const order = await this.OrderModel.deleteOne({ObjectId: objectId})
      if(!order)
            throw new HttpException('Order not found!', 404);
      return order;
    } catch (error) {
      console.log({DeleteOrderError: error})
      return {DeleteOrderError: error}
    }
  }
}
