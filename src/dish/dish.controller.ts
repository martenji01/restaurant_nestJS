import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategy/jwt/jwt-auth.guard';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: object) {
    return await this.dishService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async findAll() {
    return await this.dishService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {

    return await this.dishService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: object) {

    return await this.dishService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.dishService.deleteOne(id);
  }
}
