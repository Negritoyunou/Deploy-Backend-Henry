import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Products } from './products.interface';
import { Productsdto } from './dtos/products.dto';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('products')
export class ProductsController {
    constructor (private readonly productsService: ProductsService) {}

    @Get()
    async getProducts (
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '5'
    ) {
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 5;
        const products = await this.productsService.getProducts(pageNumber, limitNumber);
        return { data: products };
    }

    @Get(':id')
    getProductsById(@Param('id') id: string){
        return this.productsService.getProductsById(Number(id));
    }

    @UseGuards(AuthGuard)
    @Post()
    createProducts(@Body() product: Productsdto){
        return this.productsService.createProducts(product);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    updateProductsById(@Param('id') id: string, @Body() product: Productsdto) {
        return this.productsService.updateProductsById(Number(id), product);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteProducts(@Param('id') id: string) {
        return this.productsService.deleteProducts(Number(id));
    }
}