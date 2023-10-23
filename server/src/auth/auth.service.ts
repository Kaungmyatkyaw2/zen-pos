import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInAuthDto, SignUpAuthDto } from '../auth/dto';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpAuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const role = dto.isSeller ? 'SELLER' : 'CONSUMER';
      delete dto.password;
      delete dto.isSeller;
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          role,
          hash: hash,
        },
      });

      if (user.role === 'SELLER') {
        const company = await this.prisma.company.create({
          data: {
            name: user.name,
            user_id: user.id,
          },
        });

        if (company) {
          return this.signToken({ email: user.email, sub: user.id });
        } else {
          throw new ForbiddenException('An error occured in creating company');
        }
      } else {
        return this.signToken({ email: user.email, sub: user.id });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Crendetials already taken');
        }
      }
      throw new ForbiddenException(error);
    }
  }

  async signin(dto: SignInAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException("User Doesn't Exist");
    }
    const match_password = await argon.verify(user.hash, dto.password);

    if (!match_password) {
      throw new ForbiddenException('Password Incorrect');
    }

    return this.signToken({ email: user.email, sub: user.id });
  }

  async signToken(payload: { email: string; sub: string }): Promise<{
    access_token: string;
  }> {
    const secret_key = this.config.get('JWT_SECRET');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: secret_key,
    });

    return {
      access_token,
    };
  }
}
