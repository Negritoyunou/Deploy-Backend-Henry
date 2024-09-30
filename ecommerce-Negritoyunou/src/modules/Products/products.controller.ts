import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, HttpCode, UsePipes, ValidationPipe, ParseUUIDPipe, HttpException, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductsdto } from './dtos/create-product.dto';
import { AuthGuard } from '../Auth/auth.guard';
import { IsUUID } from 'class-validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload/file-upload.service';
import { ImageUploadPipe } from '../pipes/image-upload/image-upload.pipe';

@Controller('products')
export class ProductsController {
    constructor (
        private readonly productsService: ProductsService,
        private readonly fileUploadService: FileUploadService
    ) {}

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
    async getProductsById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.getProductsById(id);
        if(!IsUUID(4, { each : true})){
            throw new HttpException("Incorrect ID", HttpStatus.BAD_REQUEST)
   }

        if(!product){
            throw new HttpException("Product Not Found", HttpStatus.NOT_FOUND)
   }

   return product;
  }

    @UseGuards(AuthGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    async createProducts(@Body() product: CreateProductsdto){
        return await this.productsService.createProducts(product);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteProducts(@Param('id') id: string) {
        return await this.productsService.deleteProducts(id);
    }

    @Post(':id/upload')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Param('id') id: string, 
        @UploadedFile(new ImageUploadPipe()) file: Express.Multer.File ) {
        return this.productsService.uploadFile(file, id);
    }

    @Get(':id/image')
    @HttpCode(200)
    async getImage(@Param('id') id: string){
        return this.fileUploadService.getUrl(id);
    }
}