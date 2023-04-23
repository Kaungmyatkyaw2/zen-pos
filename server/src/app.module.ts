import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MenuItemsModule } from './menu_items/menu_items.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OptionsModule } from './options/options.module';
import { ChoicesModule } from './choices/choices.module';
import { OrderModule } from './order/order.module';
import { OrderlineModule } from './orderline/orderline.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    MenuItemsModule,
    JwtModule,
    UserModule,
    CompanyModule,
    CategoryModule,
    CloudinaryModule,
    OptionsModule,
    ChoicesModule,
    OrderModule,
    OrderlineModule,
  ],
  providers: [PrismaService, AuthService, CloudinaryService],
})
export class AppModule {}
