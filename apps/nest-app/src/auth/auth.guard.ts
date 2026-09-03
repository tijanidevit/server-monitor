
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IAuthUser } from './auth-user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (context.getClass().name === 'AuthController') {
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException("Please provide auth token.");
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);

            const user : IAuthUser = {
                id: payload.id,
                name: payload.name,
                email: payload.email,
            }
            request['user'] = user;
        } catch {
            throw new UnauthorizedException("Token is not valid.");
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
