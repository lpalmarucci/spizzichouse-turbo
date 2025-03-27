import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfig, JwtAuthConfig } from '../config/types';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt.guard';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService<ApiConfig>) => {
        const jwtConfig: JwtAuthConfig = config.get('auth').jwt;
        return {
          global: true,
          secret: jwtConfig.secret,
          signOptions: { expiresIn: jwtConfig.expiresIn },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy, GoogleStrategy, { provide: APP_GUARD, useValue: JwtAuthGuard }],
  controllers: [AuthController],
})
export class AuthModule {}
