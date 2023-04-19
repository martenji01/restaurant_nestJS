import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Request, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt/jwt-auth.guard';
import { Role } from 'src/auth/strategy/roles/role.enum';
import { Roles } from 'src/auth/strategy/roles/role.decorator';
import { RolesGuard } from 'src/auth/strategy/roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('list')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
