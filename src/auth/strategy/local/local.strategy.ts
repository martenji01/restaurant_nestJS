import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { UserLoginDto } from 'src/users/dto/user-login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    //console.log({username, password})
    const user = await this.authService.validateUser({username, password});
    //console.log({afterValidate: user})
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  
}