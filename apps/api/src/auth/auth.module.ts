import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfig, JwtAuthConfig } from '../config/types';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseStrategy } from './strategy/supabase-strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
  providers: [
    AuthService,
    PrismaService,
    SupabaseStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: SupabaseGuard,
    // },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
