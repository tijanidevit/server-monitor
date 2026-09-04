import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ){}

    async signIn(signInDto: AuthSignInDto): Promise<any> {
        const {email, password:pass} = signInDto;
        
        const user = await this.userService.findOneByEmail(email);
    
        if (!user) {
            throw new NotFoundException("Invalid credentials.");
        }
        
        const isPasswordValid = await bcrypt.compare(pass, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials.");
        }
        return this.generateAuthResponse(user);
    }

    async signUp(createUserDto: CreateUserDto): Promise<any> {
        const isExistUser = await this.userService.findOneByEmail(createUserDto.email);

        if (isExistUser) {
            throw new UnauthorizedException("User already exists");
        }
        
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
        const user = await this.userService.create({
            ...createUserDto,
            password: hashedPassword,
        });
        
        return this.generateAuthResponse(user);
    }

    private async generateAuthResponse(user: any) {
        const { password, ...result } = user;
        
        const payload = {sub: user.id, username: user.email, name: user.name};
        const access_token = await this.jwtService.signAsync(payload);

        return {
            access_token,
            user: result
        };
    }
}
