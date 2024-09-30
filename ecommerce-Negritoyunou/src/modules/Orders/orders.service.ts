import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { Repository } from "typeorm";
import { UserService } from "../Users/users.service";
import { ProductsService } from "../Products/products.service";
import { CreateOrderDto, ProductId } from "./dtos/create-order.dto";
import { CreateOrderDetailsDto } from "../OrderDetails/dtos/create-orderDetails.dto";
import { OrderDetailsService } from "../OrderDetails/orderDetails.service";
import { OrderResponseDto } from "./dtos/response-order.dto";


@Injectable()
export class OrdersService{
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly userService: UserService,
        private readonly productService: ProductsService,
        private readonly orderDetailsService: OrderDetailsService,
    ) {}


async create( createOrderDto: CreateOrderDto ){
    const { userId, products } = createOrderDto;
    const user = await this.userService.getUserById(userId)

    const order = {
        user: user,
        date: new Date(),
    };

    const orderEntity = await this.orderRepository.save(
        this.orderRepository.create(order)
    );

    const total = await this.calculateTotal(products);

    const orderDetail = new CreateOrderDetailsDto();
    orderDetail.price = total;
    orderDetail.products = products;
    orderDetail.order = orderEntity;

    const orderDetailEntity = await this.orderDetailsService.create(orderDetail);

    return new OrderResponseDto(orderDetailEntity);
}

    private async calculateTotal(products: Array<ProductId>): Promise<number> {
        let total = 0;
        for(const product of products){
            total += await this.productService.buyProducts(product.id);
        }
        return total;
    }

    async findOne(id: string){
        const order = await this.orderRepository.findOneBy({ id });
        const orderDetail = await this.orderDetailsService.findOneByOrderId(
            order.id,
            ['products', 'order'],
        );
        return orderDetail;
    }
}