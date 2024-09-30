import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoriesdto } from "./dtos/create-categories.dto";

@Controller('categories')
export class CategoriesController{
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}

    @Get()
    findAll(){
        return this.categoriesService.findAll()
    }

    @Post()
    create(@Body() createCategoriesdto: CreateCategoriesdto){
        return this.categoriesService.create(createCategoriesdto)
    }
}