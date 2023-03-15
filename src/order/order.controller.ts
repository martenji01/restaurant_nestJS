import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: object) {
    return await this.orderService.create(body);
  }

  @Get('list')
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get('table/:id')
  async findByTable(@Param('id') id: string) {
    return await this.orderService.findOrdersByTable(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @Get('total/:id')
  async getTotal(@Param('id') id: string) {
    return await this.orderService.getOrderTotalPrice(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: object) {
    return await this.orderService.update(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.orderService.deleteOne(id);
  }
}
