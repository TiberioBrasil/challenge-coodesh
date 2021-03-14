import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import createMockInstance from 'jest-create-mock-instance';
import { Repository } from 'typeorm';
import { ApiServicesService } from '../api-services/api-services.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { User } from './entities/user.entity';
import { Status } from './enum/status.enum';
import { UsersService } from './users.service';

const mockApiServicesService = {
  getHttpResponse: jest.fn(),
};

const mockUser: User = {
  loginUuid: '4f69057a-20c3-474f-8440-c015140af95a',
  gender: 'male',
  nameTitle: 'Mr',
  nameFirst: 'Felix',
  nameLast: 'Andersen',
  locationStreetNumber: 9608,
  locationStreetName: 'Nordre Strandvej',
  locationCity: 'Jerslev Sj',
  locationState: 'Nordjylland',
  locationCountry: 'Denmark',
  locationPostcode: '51225',
  locationCoordinatesLatitude: '37.3998',
  locationCoordinatesLongitude: '2.3021',
  locationTimezoneOffset: '+5:00',
  locationTimezoneDescription: 'Ekaterinburg, Islamabad, Karachi, Tashkent',
  email: 'felix.andersen@example.com',
  loginUsername: 'angrybutterfly251',
  loginPassword: 'waldo',
  loginSalt: 'G83WdzxA',
  loginMd5: '2e742bbc47b33dea1b4249f2a13e0a2b',
  loginSha1: 'f5724ae036bc1d8bca0929cb80c94132cafde1a3',
  loginSha256:
    'e458298e8f3383d85e02ec36fc3559d74b496baf5666b167233d0bc72f6b3c8f',
  dobDate: new Date('1968-06-21T03:16:08.218Z'),
  dobAge: 53,
  registeredDate: new Date('2016-03-26T19:42:40.561Z'),
  registeredAge: 5,
  phone: '57060720',
  cell: '99660119',
  idName: 'CPR',
  idValue: '210668-7172',
  pictureLarge: 'https://randomuser.me/api/portraits/men/89.jpg',
  pictureMedium: 'https://randomuser.me/api/portraits/med/men/89.jpg',
  pictureThumbnail: 'https://randomuser.me/api/portraits/thumb/men/89.jpg',
  nat: 'DK',
  imported_t: new Date('2021-03-07T12:47:05.615Z'),
  status: Status.draft,
};

const mockUserArray = [mockUser];

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;
  let apiServicesService: jest.Mocked<ApiServicesService>;

  beforeEach(async () => {
    apiServicesService = createMockInstance(ApiServicesService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        { provide: ApiServicesService, useValue: mockApiServicesService },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(apiServicesService).toBeDefined();
  });

  describe('index()', () => {
    it('should return an array of users', async () => {
      const pagination: PaginationQueryDto = { skip: 0, take: 100 };
      const findSpy = jest
        .spyOn(usersRepository, 'find')
        .mockImplementationOnce(async () => mockUserArray);

      const users = await usersService.index(pagination);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(users).toEqual(mockUserArray);
    });
  });

  describe('show()', () => {
    it('should return a specific user', async () => {
      const userUUID = 'valid-uuid';
      const findSpy = jest
        .spyOn(usersRepository, 'findOneOrFail')
        .mockImplementationOnce(async () => mockUser);

      const user = await usersService.show(userUUID);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(user).toEqual(mockUser);
    });

    it('should throw an error if the uuid is not found', async () => {
      try {
        const userUUID = '4f69057a-20c3-474f-8440-c015140af95a';
        await usersService.show(userUUID);
      } catch (e) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('User not found');
      }
    });
  });

  describe('create()', () => {
    it('should create a user', async () => {
      const findOneSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      const createSpy = jest
        .spyOn(usersRepository, 'create')
        .mockImplementation(() => mockUser);
      const saveSpy = jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockUser as User);

      expect(await usersService.create({ ...mockUser })).toBe(mockUser);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the user id is already registered', async () => {
      const findOneSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => mockUser);

      try {
        await usersService.create({ ...mockUser });
      } catch (e) {
        expect(e.status).toBe(400);
        expect(e.message).toBe(`Email already exists: ${mockUser.email}`);
      }
      expect(findOneSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the user id is already registered - async functions', async () => {
      const findOneSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      const createSpy = jest
        .spyOn(usersRepository, 'create')
        .mockImplementation(() => mockUser);
      const saveSpy = jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => {
          throw new BadRequestException(
            `Email already exists: ${mockUser.email}`,
          );
        });

      try {
        await usersService.create({ ...mockUser });
      } catch (e) {
        expect(e.status).toBe(400);
        expect(e.message).toBe(
          `Error trying to create the user: Error: Email already exists: ${mockUser.email}`,
        );
      }
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if any errors happened trying to create the user - async functions', async () => {
      const findOneSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => null);
      const createSpy = jest
        .spyOn(usersRepository, 'create')
        .mockImplementation(() => {
          throw new Error('duplicate key value violates unique constraint');
        });

      try {
        await usersService.create({ ...mockUser });
      } catch (e) {
        expect(e.status).toBe(400);
        expect(e.message).toBe(`Email already exists: ${mockUser.email}`);
      }
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it('should update a user', async () => {
      const preloadSpy = jest
        .spyOn(usersRepository, 'preload')
        .mockImplementation(async () => mockUser);
      const saveSpy = jest
        .spyOn(usersRepository, 'save')
        .mockImplementation(async () => mockUser as User);

      expect(
        await usersService.update(mockUser.loginUuid, { ...mockUser }),
      ).toBe(mockUser);
      expect(preloadSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw a badrequest exception if the user is not found', async () => {
      const preloadSpy = jest
        .spyOn(usersRepository, 'preload')
        .mockImplementation(async () => null);

      try {
        await usersService.update(mockUser.loginUuid, { ...mockUser });
      } catch (e) {
        expect(e.status).toBe(404);
        expect(e.message).toBe(`User #${mockUser.loginUuid} not found`);
      }
      expect(preloadSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete()', () => {
    it('should delete a user', async () => {
      const serviceShowSpy = jest
        .spyOn(usersRepository, 'findOneOrFail')
        .mockImplementation(async () => mockUser);
      const deleteSpy = jest
        .spyOn(usersRepository, 'delete')
        .mockImplementation();

      expect(await usersService.destroy(mockUser.loginUuid)).toBeUndefined();
      expect(serviceShowSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw a badrequest exception if the user is not found', async () => {
      const serviceShowSpy = jest
        .spyOn(usersRepository, 'findOneOrFail')
        .mockImplementation(async () => {
          throw new Error(`User not found`);
        });

      try {
        await usersService.destroy(mockUser.loginUuid);
      } catch (e) {
        expect(e.status).toBe(404);
        expect(e.message).toBe(`User not found`);
      }
      expect(serviceShowSpy).toHaveBeenCalledTimes(1);
    });
  });
});
