import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { userInfoDto } from 'src/users/dto/user-info.dto';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import { UserReturnDto } from 'src/users/dto/user-return.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

  async validateUser(userLogin: UserLoginDto): Promise<UserReturnDto> {
    const user = await this.usersService.findOneReturnPassword(userLogin.username);
    
    if (user && user.password === userLogin.password) {
      const {password, ...result} = user
      return result;
    }
    return null;
  }

  async registerNewUser(createUserDto : CreateUserDto){
    return this.usersService.create(createUserDto)
  }

  async login(user: any) {
    const payload = { username: user.username, userId: user._id };
    console.log({payload})
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
