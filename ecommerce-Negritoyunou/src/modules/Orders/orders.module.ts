import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { OrderDetails } from "../OrderDetails/orderdetails.entity";
import { User } from "../Users/users.entity";
import { Products } from "../Products/products.entity";
import { UserModule } from "../Users/users.module";
import { ProductsModule } from "../Products/products.module";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrderDetailsModule } from "../OrderDetails/orderDetails.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderDetails, User, Products]),
        UserModule,
        ProductsModule,
        OrderDetailsModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule {}