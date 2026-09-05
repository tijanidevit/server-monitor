import { Test, TestingModule } from '@nestjs/testing';
import { RemoteServersService } from './remote-servers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RemoteServer } from './entities/remote-server.entity';
import { NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach } from 'vitest';
import { Repository } from 'typeorm';

describe('RemoteServersService', () => {
  let service: RemoteServersService;
  let repository: Mocked<Repository<RemoteServer>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoteServersService,
        {
          provide: getRepositoryToken(RemoteServer),
          useValue: mock<Repository<RemoteServer>>(),
        },
      ],
    }).compile();

    service = module.get<RemoteServersService>(RemoteServersService);
    repository = module.get(getRepositoryToken(RemoteServer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save and return the new remote server with ownerId and userId', async () => {
      const createDto = { name: 'Test Server', config: { address: '192.168.1.1' } };
      const ownerId = 'owner-123';
      const expectedSaved = { id: 'server-1', ...createDto, ownerId, userId: ownerId };

      repository.save.mockResolvedValue(expectedSaved as any);

      const result = await service.create(createDto as any, ownerId);

      expect(repository.save).toHaveBeenCalledWith({
        ...createDto,
        ownerId,
        userId: ownerId,
      });
      expect(result).toEqual(expectedSaved);
    });
  });

  describe('findAll', () => {
    it('should return a list of servers belonging to the owner', async () => {
      const ownerId = 'owner-123';
      const servers = [{ id: 'server-1', name: 'Server 1', ownerId }];

      repository.find.mockResolvedValue(servers as any);

      const result = await service.findAll(ownerId);

      expect(repository.find).toHaveBeenCalledWith({
        where: { ownerId },
      });
      expect(result).toEqual(servers);
    });
  });

  describe('findOne', () => {
    it('should return the server if found', async () => {
      const ownerId = 'owner-123';
      const id = 'server-1';
      const server = { id, name: 'Server 1', ownerId };

      repository.findOne.mockResolvedValue(server as any);

      const result = await service.findOne(ownerId, id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { ownerId, id },
      });
      expect(result).toEqual(server);
    });

    it('should throw NotFoundException if the server is not found', async () => {
      const ownerId = 'owner-123';
      const id = 'server-1';

      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(ownerId, id)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { ownerId, id },
      });
    });
  });

  describe('update', () => {
    it('should update the server if it exists', async () => {
      const ownerId = 'owner-123';
      const id = 'server-1';
      const updateDto = { name: 'Updated Server' };
      const server = { id, name: 'Server 1', ownerId };

      repository.findOne.mockResolvedValue(server as any);
      repository.update.mockResolvedValue({ affected: 1 } as any);

      await service.update(ownerId, id, updateDto as any);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { ownerId, id },
      });
      expect(repository.update).toHaveBeenCalledWith(
        { ownerId, id },
        updateDto,
      );
    });

    it('should throw NotFoundException if updating a non-existent server', async () => {
      const ownerId = 'owner-123';
      const id = 'server-1';
      const updateDto = { name: 'Updated Server' };

      repository.findOne.mockResolvedValue(null);

      await expect(service.update(ownerId, id, updateDto as any)).rejects.toThrow(NotFoundException);
      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the server if it exists', async () => {
      const ownerId = 'owner-123';
      const id = 'server-1';
      const server = { id, name: 'Server 1', ownerId };

      repository.findOne.mockResolvedValue(server as any);
      repository.delete.mockResolvedValue({ affected: 1 } as any);

      await service.remove(ownerId, id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { ownerId, id },
      });
      expect(repository.delete).toHaveBeenCalledWith({
        ownerId,
        id,
      });
    });

    it('should throw NotFoundException if removing a non-existent server', async () => {
      const ownerId = 'owner-123';
      const id = 'server-1';

      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(ownerId, id)).rejects.toThrow(NotFoundException);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
