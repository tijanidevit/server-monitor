
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string

    @IsEmail({require_tld: true }, { message: "Please enter a valid email address." })
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(6)
    password: string
}
