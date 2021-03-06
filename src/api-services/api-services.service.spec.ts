import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import createMockInstance from 'jest-create-mock-instance';
import { ApiServicesService } from './api-services.service';
import { Observable } from 'rxjs';

describe('ApiServicesService', () => {
  let service: ApiServicesService;
  let httpService: jest.Mocked<HttpService>;

  const fakeDataReturn = {
    results: [
      {
        gender: 'male',
        name: {
          title: 'Mr',
          first: 'Basil',
          last: 'Van Kerkhof',
        },
        location: {
          street: {
            number: 7631,
            name: 'Derde Egelantiersdwarsstraat',
          },
          city: 'Oldehove',
          state: 'Friesland',
          country: 'Netherlands',
          postcode: 82207,
          coordinates: {
            latitude: '44.1314',
            longitude: '-131.6367',
          },
          timezone: {
            offset: '+7:00',
            description: 'Bangkok, Hanoi, Jakarta',
          },
        },
        email: 'basil.vankerkhof@example.com',
        login: {
          uuid: '1ddc6a3c-2ee3-4fbb-8a01-2879b0a97f6e',
          username: 'angrybird262',
          password: 'oasis',
          salt: 'h63l0STa',
          md5: 'e53a7ebfce3f34a613500db1a14937b2',
          sha1: 'bf897a4d24e576e5c0846db31a9f38447b51eaa0',
          sha256:
            'a9918c05f8b7f9f6319dc65f60521516a2f4114db9698efff904170f29ce24c6',
        },
        dob: {
          date: '1974-08-25T03:16:59.446Z',
          age: 47,
        },
        registered: {
          date: '2010-06-28T08:33:01.025Z',
          age: 11,
        },
        phone: '(706)-549-4814',
        cell: '(070)-075-9089',
        id: {
          name: 'BSN',
          value: '47262778',
        },
        picture: {
          large: 'https://randomuser.me/api/portraits/men/56.jpg',
          medium: 'https://randomuser.me/api/portraits/med/men/56.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/men/56.jpg',
        },
        nat: 'NL',
      },
    ],
    info: {
      seed: '1994894d8b74feed',
      results: 1,
      page: 1,
      version: '1.3',
    },
  };

  const fakeDataBadException = {
    status: 400,
    message: 'Erro ao tentar selecionar dados da API.',
  };

  beforeEach(async () => {
    httpService = createMockInstance(HttpService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiServicesService,
        {
          provide: HttpService,
          useValue: httpService,
        },
      ],
    }).compile();

    service = module.get<ApiServicesService>(ApiServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHttpResponse()', () => {
    it('should be defined', () => {
      expect(service.getHttpResponse).toBeDefined();
    });

    it('should return a valid user', async () => {
      httpService.get.mockImplementationOnce((url) => {
        return new Observable((subscribe) => {
          try {
            expect(url).toBe('http://');
          } catch (err) {
            subscribe.error(err);
          }
          subscribe.next({
            config: {},
            request: {},
            data: fakeDataReturn,
            headers: { 'Content-Type': 'application/json' },
            status: 200,
            statusText: 'OK',
          });
          subscribe.complete();
        });
      });

      const result = await service.getHttpResponse('http://');

      expect(result).toBeDefined();
    });

    it('should return a badrequest', async () => {
      httpService.get.mockImplementationOnce((url) => {
        return new Observable((subscribe) => {
          try {
            expect(url).toBe('http://');
          } catch (err) {
            subscribe.error(err);
          }
          subscribe.next({
            config: {},
            request: {},
            data: fakeDataBadException,
            headers: { 'Content-Type': 'application/json' },
            status: 400,
            statusText: 'BadRequestException',
          });
          subscribe.complete();
        });
      });

      const result = await service.getHttpResponse('http://');

      expect(result.status).toBe(400);
      expect(result.message).toBe('Erro ao tentar selecionar dados da API.');
    });
  });
});
