import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseMessage } from '../common/response/response.decorator';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post("signin")
    @ResponseMessage('User signed in successfully')
    signIn(@Body() signInDto: AuthSignInDto) {
        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("signup")
    @ResponseMessage('User registered successfully')
    signUp(@Body() signUpDto: AuthSignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
