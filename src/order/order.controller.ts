import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategy/jwt/jwt-auth.guard';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: any, @Body() body: object) {
    const {sub} = req.user 
    return await this.orderService.create(body, sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async findAll() {
    return await this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('table/:id')
  async findByTable(@Param('id') id: string) {
    return await this.orderService.findOrdersByTable(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('total/:id')
  async getTotal(@Param('id') id: string) {
    return await this.orderService.getOrderTotalPrice(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: object) {
    return await this.orderService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.orderService.deleteOne(id);
  }
}
