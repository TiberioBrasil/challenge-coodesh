import { Test, TestingModule } from '@nestjs/testing';
import createMockInstance from 'jest-create-mock-instance';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from './entities/user.entity';
import { Status } from './enum/status.enum';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: createMockInstance(UsersService),
        },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('index', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(usersService, 'index')
        .mockImplementation(async () => mockUserArray);

      const paginationQuery: PaginationQueryDto = { skip: 0, take: 1 };
      expect(await controller.index(paginationQuery)).toBe(mockUserArray);
    });
  });

  describe('show', () => {
    it('should return a specific user', async () => {
      jest.spyOn(usersService, 'show').mockImplementation(async () => mockUser);

      expect(await controller.show(mockUser.loginUuid)).toBe(mockUser);
    });
  });

  describe('udpate', () => {
    it('should update a specific user', async () => {
      jest
        .spyOn(usersService, 'update')
        .mockImplementation(async () => mockUser);

      expect(await controller.update(mockUser.loginUuid, mockUser)).toBe(
        mockUser,
      );
    });
  });

  describe('destroy', () => {
    it('should destroy a specific user', async () => {
      jest.spyOn(usersService, 'destroy').mockImplementation();

      expect(await controller.destroy(mockUser.loginUuid)).toBeUndefined();
    });
  });
});
