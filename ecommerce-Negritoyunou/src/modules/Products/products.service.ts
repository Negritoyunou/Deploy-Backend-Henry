import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './products.interface';

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) {}

    getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit);
    }
    
    getProductsById(id: number) {
        return this.productsRepository.getProductsById(id);
    }

    createProducts(product: Omit<Products, 'id'>):Promise<Products> {
        return this.productsRepository.createProducts(product);
    }

    updateProductsById(id: number, product: Products): Promise<Products> {
        return this.productsRepository.updateProductsById(id, product);
      }
      
    deleteProducts(id: number): Promise<void> {
        return this.productsRepository.deleteProducts(id);
      }
}
