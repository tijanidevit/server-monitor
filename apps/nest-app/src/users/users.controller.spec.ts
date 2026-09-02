import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mock<UsersService>(),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<Mocked<UsersService>>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user without password', () => {
    const user: any = { name: 'John Doe', email: 'me@gmail.com' };
    service.create.mockReturnValue(user);

    const result = controller.create(user);

    expect(result).toBe(user);
    expect(service.create).toHaveBeenCalledOnce();
    expect(service.create).toHaveBeenCalledWith(user);
  });

  it('should create a user with password', () => {
    const user: any = { name: 'John Doe', email: 'me@gmail.com', password: 'password' };
    service.create.mockReturnValue(user);

    const result = controller.create(user);

    expect(result).toBe(user);
    expect(service.create).toHaveBeenCalledOnce();
    expect(service.create).toHaveBeenCalledWith(user);
  });

  it('should fetch all users', () => {
    const users: any = [{ name: 'John Doe', email: 'me@gmail.com', password: 'password' }];
    service.findAll.mockReturnValue(users);

    const result = controller.findAll();

    expect(result).toBe(users);
    expect(service.findAll).toHaveBeenCalledOnce();
  });

  it('should fetch a single user', () => {
    const user: any = { name: 'John Doe', email: 'me@gmail.com', password: 'password' };
    service.findOne.mockReturnValue(user);

    const result = controller.findOne('1');

    expect(result).toBe(user);
    expect(service.findOne).toHaveBeenCalledOnce();
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a user', () => {
    const user: any = { name: 'John Doe', email: 'me@gmail.com', password: 'password' };
    service.update.mockReturnValue(user);

    const result = controller.update('1', user);

    expect(result).toBe(user);
    expect(service.update).toHaveBeenCalledOnce();
    expect(service.update).toHaveBeenCalledWith('1', user);
  });

  it('should remove a user', () => {
    const user: any = { name: 'John Doe', email: 'me@gmail.com', password: 'password' };
    service.remove.mockReturnValue(user);

    const result = controller.remove('1');

    expect(result).toBe(user);
    expect(service.remove).toHaveBeenCalledOnce();
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
