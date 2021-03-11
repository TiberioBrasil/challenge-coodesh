import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiServicesService } from '../api-services/api-services.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Status } from './enum/status.enum';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private apiServicesService: ApiServicesService,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async index(paginationQuery: PaginationQueryDto): Promise<User[]> {
    const { skip, take } = paginationQuery;

    return this.usersRepository.find({
      skip: skip || 0,
      take: take || 100,
    });
  }

  async show(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  @Cron('0 40 9 * * *', {
    timeZone: 'America/Fortaleza',
  })
  async create(): Promise<any> {
    const pagesToLoad = 20;
    const resultsPerPage = 100;
    const urlsToFetch = [];
    const delayIncrement = 1000;

    let delay = 0;

    delay += delayIncrement;

    for (let i = 0; i < pagesToLoad; i++) {
      urlsToFetch.push(
        new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
          this._cronFetchUsers(
            `https://randomuser.me/api/?results=${resultsPerPage}&page=${
              i + 1
            }`,
          ),
        ),
      );

      delay += delayIncrement;
    }

    Promise.all(urlsToFetch);

    return 'Usuários criados com sucesso!';
  }

  async update(loginUuid: string, updateUserDto: UpdateUserDto): Promise<User> {
    delete updateUserDto.loginUuid;
    delete updateUserDto.email;

    const user = await this.usersRepository.preload({
      loginUuid,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User #${loginUuid} not found`);
    }
    return this.usersRepository.save(user);
  }

  async destroy(id: string): Promise<void> {
    const user = await this.show(id);
    await this.usersRepository.delete(user);
  }

  async _getUsers(url: string): Promise<IUser[]> {
    // Use axios to fetch data from a specific URL usibg built-in HttpModule
    const usersResponse = await this.apiServicesService.getHttpResponse(url);

    if (!usersResponse) {
      throw new BadRequestException(`Erro ao tentar selecionar da url: ${url}`);
    }

    const returnData = [];
    usersResponse.results.map((user: IUser) => {
      returnData.push(user);
    });

    return returnData;
  }

  async _cronFetchUsers(url: string): Promise<void> {
    const users = await this._getUsers(url);

    users.map(async (user) => {
      const checkIfUserMailAlreadyExists = await this.usersRepository.findOne({
        email: user.email,
      });

      if (!checkIfUserMailAlreadyExists) {
        try {
          const createdUser = this.usersRepository.create({
            loginUuid: user.login.uuid,
            gender: user.gender,
            nameTitle: user.name.title,
            nameFirst: user.name.first,
            nameLast: user.name.last,
            locationStreetNumber: +user.location.street.number,
            locationStreetName: user.location.street.name,
            locationCity: user.location.city,
            locationState: user.location.state,
            locationCountry: user.location.country,
            locationPostcode: user.location.postcode,
            locationCoordinatesLatitude: user.location.coordinates.latitude,
            locationCoordinatesLongitude: user.location.coordinates.longitude,
            locationTimezoneOffset: user.location.timezone.offset,
            locationTimezoneDescription: user.location.timezone.description,
            email: user.email,
            loginUsername: user.login.username,
            loginPassword: user.login.password,
            loginSalt: user.login.salt,
            logiMd5: user.login.md5,
            loginSha1: user.login.sha1,
            loginSha256: user.login.sha256,
            dobDate: new Date(user.dob.date),
            dobAge: +user.dob.age,
            registeredDate: new Date(user.registered.date),
            registeredAge: +user.registered.age,
            phone: user.phone,
            cell: user.cell,
            idName: user.id.name,
            idValue: user.id.value,
            pictureLarge: user.picture.large,
            pictureMedium: user.picture.medium,
            pictureThumbnail: user.picture.thumbnail,
            nat: user.nat,
            imported_t: new Date(),
            status: Status.draft,
          });

          return await this.usersRepository.save(createdUser);
        } catch (error) {
          if (
            error
              .toString()
              .indexOf('duplicate key value violates unique constraint') !== -1
          ) {
            this.logger.debug(`Email already exists: ${user.email}`);
          } else {
            this.logger.debug(`Error trying to create the user: ${error}`);
          }
        }
      } else {
        this.logger.debug(`Email already exists: ${user.email}`);
      }
    });
  }
}
