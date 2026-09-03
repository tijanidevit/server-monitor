import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthSignInDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string; 
}
