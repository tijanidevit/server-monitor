import { Injectable } from '@nestjs/common';
import { CreateRemoteServerDto } from './dto/create-remote-server.dto';
import { UpdateRemoteServerDto } from './dto/update-remote-server.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RemoteServer } from './entities/remote-server.entity';
import { Repository } from 'typeorm';
import type { IAuthUser } from '../auth/auth-user.interface';

@Injectable()
export class RemoteServersService {
  constructor(
    @InjectRepository(RemoteServer)
    private remoteServerRepository: Repository<RemoteServer>
  ){}
  
  create(
    createRemoteServerDto: CreateRemoteServerDto,
    authUser: IAuthUser
  ) {
    return this.remoteServerRepository.save({
      ...createRemoteServerDto,
      ownerId: authUser.id
    })
  }

  findAll() {
    return `This action returns all remoteServers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} remoteServer`;
  }

  update(id: number, updateRemoteServerDto: UpdateRemoteServerDto) {
    return `This action updates a #${id} remoteServer`;
  }

  remove(id: number) {
    return `This action removes a #${id} remoteServer`;
  }
}
