import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { OrderDetailsService } from "./orderDetails.service";
import { CreateOrderDetailsDto } from "./dtos/create-orderDetails.dto";

@Controller('order-details')
export class OrderDetailsController{
    constructor(private readonly orderDetailsService: OrderDetailsService){}

@Get(':id')
findById(@Param('id') id: string){
    return this.orderDetailsService.findOne(id)
}

@Post()
create(@Body() createOrderDetailsDto: CreateOrderDetailsDto){
    return this.orderDetailsService.create(createOrderDetailsDto)
}

}