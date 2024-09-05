import { Module } from '@nestjs/common';
import { AuthModule } from './modules/Auth/auth.module';
import { AuthService } from './modules/Auth/auth.service';
import { AuthController } from './modules/Auth/auth.controller';
import { ProductsModule } from './modules/Products/products.module';
import { ProductsService } from './modules/Products/products.service';
import { ProductsController } from './modules/Products/products.controller';
import { UserModule } from './modules/Users/users.module';
import { UserService } from './modules/Users/users.service';
import { UserController } from './modules/Users/users.controller';
import { UsersRepository } from './modules/Users/users.repository';
import { ProductsRepository } from './modules/Products/products.repository';

@Module({
  imports: [UserModule, AuthModule, ProductsModule],
  controllers: [UserController, AuthController, ProductsController],
  providers: [UserService, AuthService, ProductsService, UsersRepository, ProductsRepository],
})
export class AppModule {}
