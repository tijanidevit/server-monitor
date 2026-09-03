import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthSignUpDto {
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsEmail({require_tld:true})
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string; 
}
