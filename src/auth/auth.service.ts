import { Injectable } from '@nestjs/common';
import { userInfoDto } from 'src/users/dto/user-info.dto';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import { UserReturnDto } from 'src/users/dto/user-return.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

  async validateUser(userLogin: UserLoginDto): Promise<UserReturnDto> {
    const user = await this.usersService.findOneReturnPassword(userLogin.username);
    
    if (user && user.password === userLogin.password) {
      const {password, ...result} = user
      return result;
    }
    return null;
  }
}
