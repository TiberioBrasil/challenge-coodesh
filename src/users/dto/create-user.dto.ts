import {
  IsDate,
  IsHash,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Status } from '../enum/status.enum';

export class CreateUserDto {
  @IsUUID()
  loginUuid: string;

  @IsString()
  gender: string;

  @IsString()
  nameTitle: string;

  @IsString()
  nameFirst: string;

  @IsString()
  nameLast: string;

  @IsNumber()
  locationStreetNumber: number;

  @IsString()
  locationStreetName: string;

  @IsString()
  locationCity: string;

  @IsString()
  locationState: string;

  @IsString()
  locationCountry: string;

  @IsNumber()
  locationPostcode: number;

  @IsString()
  locationCoordinatesLatitude: string;

  @IsString()
  locationCoordinatesLongitude: string;

  @IsString()
  locationTimezoneOffset: string;

  @IsString()
  locationTimezoneDescription: string;

  @IsString()
  email: string;

  @IsString()
  loginUsername: string;

  @IsString()
  loginPassword: string;

  @IsString()
  loginSalt: string;

  @IsHash('md5')
  logiMd5: string;

  @IsHash('sha1')
  loginSha1: string;

  @IsHash('sha256')
  loginSha256: string;

  @IsDate()
  dobDate: Date;

  @IsNumber()
  dobAge: number;

  @IsDate()
  registeredDate: Date;

  @IsNumber()
  registeredAge: number;

  @IsString()
  phone: string;

  @IsString()
  cell: string;

  @IsString()
  @IsOptional()
  idName: string;

  @IsString()
  @IsOptional()
  idValue: string;

  @IsString()
  pictureLarge: string;

  @IsString()
  pictureMedium: string;

  @IsString()
  pictureThumbnail: string;

  @IsString()
  nat: string;

  @IsDate()
  imported_t: Date;

  @IsString()
  status: Status;
}
