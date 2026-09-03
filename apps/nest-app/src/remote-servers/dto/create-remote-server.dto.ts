import { RemoteServerStatus } from "../entities/remote-server.entity";
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreateRemoteServerDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsObject()
    @IsNotEmpty()
    config: Record<string, any>;
    
    @IsString()
    @IsOptional()
    type?: string;
    
    @IsEnum(RemoteServerStatus)
    @IsOptional()
    status?: RemoteServerStatus;
}
