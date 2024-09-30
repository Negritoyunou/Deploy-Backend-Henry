import { Module } from '@nestjs/common';
import { AuthModule } from './modules/Auth/auth.module';
import { ProductsModule } from './modules/Products/products.module';
import { UserModule } from './modules/Users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresDataSourceConfig } from './config/data-source';
import { CategoriesModule } from './modules/Categories/categories.module';
import { OrdersModule } from './modules/Orders/orders.module';
import { OrderDetailsModule } from './modules/OrderDetails/orderDetails.module';
import { SeedModule } from './seeds/seeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresDataSourceConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (
        configService.get('postgres')
      )
    }),
    UserModule,
    AuthModule, 
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    OrderDetailsModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
