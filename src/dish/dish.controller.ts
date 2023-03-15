import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Post('create')
  async create(@Body() body: object) {
    return await this.dishService.create(body);
  }

  @Get('list')
  async findAll() {
    return await this.dishService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {

    return await this.dishService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: object) {

    return await this.dishService.update(id, body);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {

    return await this.dishService.deleteOne(id);
  }
}
