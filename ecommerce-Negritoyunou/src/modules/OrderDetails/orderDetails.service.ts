import { OrderDetails } from "./orderdetails.entity";
import { UpdateOrderDetailsDto } from "./dtos/update-orderDetails.dto";
import { CreateOrderDetailsDto } from "./dtos/create-orderDetails.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class OrderDetailsService{
    constructor(
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepository: Repository<OrderDetails>
    ){}

      findOne(id: string) {
        return this.orderDetailsRepository.findOneBy({ id });
    }

    create(createOrderDetailsDto: CreateOrderDetailsDto){
        return this.orderDetailsRepository.save(createOrderDetailsDto)
    }

    async findOneByOrderId( orderId: string, relations: string[] = [],): Promise<OrderDetails[]>{
        return await this.orderDetailsRepository.find({
            where: { order: { id: orderId } },
            relations: relations,
        })
    }
}