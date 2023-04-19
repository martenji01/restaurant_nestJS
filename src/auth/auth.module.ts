import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';

@Module({
  imports:[UsersModule, PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy
    ],
  exports: [AuthService]
})
export class AuthModule {}
