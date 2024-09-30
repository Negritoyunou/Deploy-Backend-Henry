import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductsdto } from './dtos/create-product.dto';
import { UploadFileDto } from '../file-upload/dto/upload-file.dto';
import { FileUploadService } from '../file-upload/file-upload.service';



@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    private readonly fileUploadService: FileUploadService
  ) {}

    async getProducts(page: number, limit: number) {
      const skip = (page - 1) * limit
        return await this.productsRepository.find({
          take: limit,
          skip: skip,
        });
    }
    
    async getProductsById(id: string): Promise<Products> {
        return await this.productsRepository.findOneBy({ id });
    }

    async createProducts(product: CreateProductsdto): Promise<Products> {
        const newProduct = this.productsRepository.create(product)
        return await this.productsRepository.save(newProduct);
    }
      
    async deleteProducts(id: string): Promise<{ id: string }>{
      await this.productsRepository.delete(id);
      return { id };
    }

    async buyProducts(id: string){
      const product = await this.productsRepository.findOneBy({ id });
      if(product.stock === 0) {
        throw new Error('Out of stock');
      }

      console.log('Product bought successfully');
      return product.price;
    }

    async uploadFile(file: UploadFileDto, id: string){
      const url = await this.fileUploadService.uploadFile({
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer,
      });
      await this.productsRepository.update(id, { imgUrl: url })
      return { imgUrl: url }
    }
}
