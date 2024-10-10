import { Module } from '@nestjs/common';
import { AuthModule } from './modules/Auth/auth.module';
import { ProductsModule } from './modules/Products/products.module';
import { UserModule } from './modules/Users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresDataSourceConfig, sqliteDataSourceConfig } from './config/data-source';
import { CategoriesModule } from './modules/Categories/categories.module';
import { OrdersModule } from './modules/Orders/orders.module';
import { OrderDetailsModule } from './modules/OrderDetails/orderDetails.module';
import { SeedModule } from './seeds/seeds.module';
import { SharedModule } from './shared/shared/shared.module';
import { AppController } from './app.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', 'env'],
      isGlobal: true,
      load: [postgresDataSourceConfig, sqliteDataSourceConfig, () => ({
        environment: process.env.ENVIRONMENT || 'TEST',
      })],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (
        configService.get('environment') === 'TEST' 
        ? configService.get('sqlite') 
        : configService.get('postgres')
      ),
    }),
    UserModule,
    AuthModule, 
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    OrderDetailsModule,
    SeedModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
