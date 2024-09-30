import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { Repository } from "typeorm";
import { CreateCategoriesdto } from "./dtos/create-categories.dto";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>
    ) {}

    async findAll(): Promise<Category[]> {
        return await this.categoriesRepository.find();
      }

    create(createCategoriesdto: CreateCategoriesdto){
        return this.categoriesRepository.save(createCategoriesdto)
    }
}