import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class CreateProductsdto {

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsString()
    imgUrl?: string;

    category_id?: string;

}