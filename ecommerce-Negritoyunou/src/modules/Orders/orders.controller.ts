import { Controller, Post, Get, Param, Body } from "@nestjs/common";

import { CreateOrderDto } from "./dtos/create-order.dto";
import { OrdersService } from "./orders.service";

@Controller('orders')
export class OrdersController{
    constructor(
        private readonly ordersService: OrdersService
    ){}


@Post()
async createOrder(@Body() createOrderDto: CreateOrderDto){
    return await this.ordersService.create(createOrderDto);
}

@Get(':id')
 async findOrder(@Param('id') id: string){
    return await this.ordersService.findOne(id);
}
}

