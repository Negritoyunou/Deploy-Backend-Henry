import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, Matches, IsEmail } from "class-validator";

export class CreateUserdto {

    @ApiProperty({
        type: String,
        description: 'Name of user',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string; 

    @ApiProperty({
        type: String,
        description: 'Email of user',
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @ApiProperty({
        type: String,
        description: 'The password of user',
        required: true,
    })
    @Matches(
        /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[=!@#$%^&])[A-Za-z\d=!@#$%^&]{8,15}$/,
        {
            message : 
            "La contraseña debe contener una minuscula, una mayuscula, un numero, un simbolo"
        }
    )
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        type: String,
        description: 'Confirm password',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;


    @ApiProperty({
        type: String,
        description: 'The phone of user',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        type: String,
        description: 'The country of user',
        required: false,
    })
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    country?: string;

    @ApiProperty({
        type: String,
        description: 'The address of the user',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address: string ; 

    @ApiProperty({
        type: String,
        description: 'The city of user',
        required: false,
    })
    @IsString()
    @Length(5, 20)
    city?: string;

    orders_id? : string;
}