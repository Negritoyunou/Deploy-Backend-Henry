import { Injectable } from "@nestjs/common";
import { Products } from "./products.interface";
import { Productsdto } from "./dtos/products.dto";

@Injectable()
export class ProductsRepository {
    private products = [{
        "id": 1,
        "name": "Máquina de afeitar eléctrica",
        "description": "Máquina de afeitar de alta precisión con cuchillas de titanio y batería de larga duración.",
        "price": 89.99,
        "stock": true,
        "imgUrl": "https://example.com/images/maquina-afeitar-electrica.jpg"
    },
    {
        "id": 2,
        "name": "Cera para el cabello",
        "description": "Cera modeladora con acabado mate, ideal para todo tipo de cabello.",
        "price": 14.50,
        "stock": true,
        "imgUrl": "https://example.com/images/cera-cabello.jpg"
    },
    {
        "id": 3,
        "name": "Aftershave refrescante",
        "description": "Loción aftershave con efecto refrescante, perfecta para evitar irritaciones después del afeitado.",
        "price": 24.99,
        "stock": false,
        "imgUrl": "https://example.com/images/aftershave-refrescante.jpg"
    },
    {
        "id": 4,
        "name": "Peine de madera",
        "description": "Peine hecho de madera de nogal, ideal para evitar el frizz en el cabello.",
        "price": 9.99,
        "stock": true,
        "imgUrl": "https://example.com/images/peine-madera.jpg"
    },
    {
        "id": 5,
        "name": "Champú fortalecedor",
        "description": "Champú enriquecido con vitaminas para fortalecer el cabello y prevenir la caída.",
        "price": 19.99,
        "stock": false,
        "imgUrl": "https://example.com/images/champu-fortalecedor.jpg"
    }]


    async getProducts(page: number = 1, limit: number = 5): Promise<Productsdto[]> {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return this.products.slice(startIndex, endIndex);
    }

    async getProductsById(id: number){
        return this.products.find((product) => product.id === id)
    }

    async createProducts(product: Omit<Productsdto, 'id'>){
        const id = this.products.length + 1;
        this.products = [...this.products, { id, ...product }];
        return { id, ...product }
    }

    async updateProductsById(id: number, product: Productsdto): Promise<Productsdto> {
        const index = this.products.findIndex((u) => u.id === id);
        if (index === -1) {
          throw new Error(`User with ID ${id} not found`);
        }
        this.products[index] = { ...this.products[index], ...product };
        return this.products[index];
      }
      
      async deleteProducts(id: number): Promise<void> {
        const index = this.products.findIndex((u) => u.id === id);
        if (index === -1) {
          throw new Error(`User with ID ${id} not found`);
        }
        this.products.splice(index, 1);
      }
}