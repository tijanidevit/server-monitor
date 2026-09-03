import { Test, TestingModule } from '@nestjs/testing';
import { RemoteServersService } from './remote-servers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoteServer } from './entities/remote-server.entity';

describe('RemoteServersService', () => {
  let service: RemoteServersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoteServersService,
        {
          provide: getRepositoryToken(RemoteServer),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RemoteServersService>(RemoteServersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
