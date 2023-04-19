import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './guards/public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  async register(@Body() req: any) {
    console.log({req})
    return this.authService.registerNewUser(req)
  }

  
}
