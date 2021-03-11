import { NotFoundException } from '@nestjs/common';
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
  logiMd5: '2e742bbc47b33dea1b4249f2a13e0a2b',
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
    let show;

    beforeEach(() => {
      show = jest.fn();
    });

    it('should return a specific user', async () => {
      const userUUID = 'valid-uuid';
      const findSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementationOnce(async () => mockUser);

      const user = await usersService.show(userUUID);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(user).toEqual(mockUser);
    });

    it('should throw an error if the uuid is not found', async () => {
      show.mockRejectValue({ message: 'User not found' });
      expect(usersRepository.findOne('invalid')).rejects.toThrow(
        NotFoundException,
      );

      // try {
      //   const userUUID = '4f69057a-20c3-474f-8440-c015140af95a';
      //   const user = await usersService.show(userUUID);
      //   console.log(user);
      // } catch (e) {
      //   expect(e.status).toBe(400);
      //   expect(e.message).toBe('Você deve informar de 1 a 3 ingredientes!');
      // }
    });

    //   it('should throw an error if the uuid is not found', async () => {
    //     jest
    //       .spyOn(usersRepository, 'findOne')
    //       .mockImplementation(async () => mockUserNotFound);

    //     try {
    //       const user = await usersService.show('123');
    //       console.log(user);
    //     } catch (e) {
    //       expect(e.status).toBe(400);
    //       expect(e.message).toBe('Você deve informar de 1 a 3 ingredientes!');
    //     }
    //   });
  });
});
