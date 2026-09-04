import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RemoteServersService } from './remote-servers.service';
import { CreateRemoteServerDto } from './dto/create-remote-server.dto';
import { UpdateRemoteServerDto } from './dto/update-remote-server.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import type { IAuthUser } from '../auth/auth-user.interface';
import { ResponseMessage } from '../common/response/response.decorator';

@ApiBearerAuth()
@Controller('remote-servers')
export class RemoteServersController {
  constructor(private readonly remoteServersService: RemoteServersService) {}

  @Post()
  @ResponseMessage('Remote server created successfully')
  create(
    @Body() createRemoteServerDto: CreateRemoteServerDto, 
    @AuthUser() authUser : IAuthUser
  ) {
    return this.remoteServersService.create(createRemoteServerDto, authUser);
  }

  @Get()
  @ResponseMessage('Remote servers retrieved successfully')
  findAll() {
    return this.remoteServersService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Remote server retrieved successfully')
  findOne(@Param('id') id: string) {
    return this.remoteServersService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Remote server updated successfully')
  update(@Param('id') id: string, @Body() updateRemoteServerDto: UpdateRemoteServerDto) {
    return this.remoteServersService.update(+id, updateRemoteServerDto);
  }

  @Delete(':id')
  @ResponseMessage('Remote server deleted successfully')
  remove(@Param('id') id: string) {
    return this.remoteServersService.remove(+id);
  }
}
