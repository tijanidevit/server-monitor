import { Test, TestingModule } from '@nestjs/testing';
import { RemoteServersController } from './remote-servers.controller';
import { RemoteServersService } from './remote-servers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoteServer } from './entities/remote-server.entity';

describe('RemoteServersController', () => {
  let controller: RemoteServersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoteServersController],
      providers: [
        RemoteServersService,
        {
          provide: getRepositoryToken(RemoteServer),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RemoteServersController>(RemoteServersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
