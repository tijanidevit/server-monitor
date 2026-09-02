import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mock<Repository<User>>(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Mocked<Repository<User>>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user: any = { name: 'John Doe', email: 'me@gmail.com' };
    repository.create.mockReturnValue(user);
    repository.save.mockResolvedValue(user);

    const result = await service.create(user);

    expect(result).toBe(user);
    expect(repository.create).toHaveBeenCalledWith(user);
    expect(repository.save).toHaveBeenCalledOnce();
    expect(repository.save).toHaveBeenCalledWith(user);
  });

  it('should find all users', async () => {
    const users: any = [{ name: 'John Doe', email: 'me@gmail.com' }];
    repository.find.mockResolvedValue(users);

    const result = await service.findAll();

    expect(result).toBe(users);
    expect(repository.find).toHaveBeenCalledOnce();
  });

  it('should find a user', async () => {
    const user: any = { name: 'John Doe', email: 'me@gmail.com' };
    repository.findOneBy.mockResolvedValue(user);

    const result = await service.findOne('1');

    expect(result).toBe(user);
    expect(repository.findOneBy).toHaveBeenCalledOnce();
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
  });

  it('should throw an exception when user is not found', async () => {
    repository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const user: any = { name: 'John Doe', email: 'me@gmail.com' };
    repository.findOneBy.mockResolvedValue(user);
    repository.update.mockResolvedValue(user);

    const result = await service.update('1', user);

    expect(result).toBe(user);
    expect(repository.update).toHaveBeenCalledOnce();
    expect(repository.update).toHaveBeenCalledWith('1', user);
  });

  it('should remove a user', async () => {
    const user: any = { name: 'John Doe', email: 'me@gmail.com' };
    repository.delete.mockResolvedValue(user);

    const result = await service.remove('1');

    expect(result).toBe(user);
    expect(repository.delete).toHaveBeenCalledOnce();
    expect(repository.delete).toHaveBeenCalledWith('1');
  });
});
