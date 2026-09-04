import { Injectable, NotFoundException } from '@nestjs/common';
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
  
  create(
    createRemoteServerDto: CreateRemoteServerDto,
    ownerId: string
  ) {

    return this.remoteServerRepository.save({
      ...createRemoteServerDto,
      ownerId: ownerId,
      userId: ownerId
    })
  }

  findAll(ownerId: string) {
    return this.remoteServerRepository.find({
      where: { ownerId: ownerId }
    });
  }

  async findOne(ownerId: string, id: string) {
    return await this.getById(ownerId, id);
  }

  private async getById(ownerId: string, id: string) {
    const remoteServer = await this.remoteServerRepository.findOne({
      where: { ownerId, id }
    });
    
    if (!remoteServer) {
      throw new NotFoundException(`Remote Server not found`);
    }
    return remoteServer;
  }

  async update(ownerId: string, id: string, updateRemoteServerDto: UpdateRemoteServerDto) {
    await this.getById(ownerId, id);

    return this.remoteServerRepository.update({
      ownerId: ownerId,
      id: id
    }, updateRemoteServerDto);
  }

  async remove(ownerId: string, id: string) {
    await this.getById(ownerId, id);
    
    return this.remoteServerRepository.delete({
      ownerId: ownerId,
      id: id
    });
  }
}
