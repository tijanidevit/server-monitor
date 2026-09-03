import { Injectable } from '@nestjs/common';
import { CreateRemoteServerDto } from './dto/create-remote-server.dto';
import { UpdateRemoteServerDto } from './dto/update-remote-server.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RemoteServer } from './entities/remote-server.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RemoteServersService {
  constructor(
    @InjectRepository(RemoteServer)
    private remoteServerRepository: Repository<RemoteServer>
  ){}
  
  create(createRemoteServerDto: CreateRemoteServerDto) {
    return 'This action adds a new remoteServer';
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
