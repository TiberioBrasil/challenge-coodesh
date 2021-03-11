import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsUUID()
  loginUuid: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  nameTitle: string;

  @ApiProperty()
  @IsString()
  nameFirst: string;

  @ApiProperty()
  @IsString()
  nameLast: string;

  @ApiProperty()
  @IsNumber()
  locationStreetNumber: number;

  @ApiProperty()
  @IsString()
  locationStreetName: string;

  @ApiProperty()
  @IsString()
  locationCity: string;

  @ApiProperty()
  @IsString()
  locationState: string;

  @ApiProperty()
  @IsString()
  locationCountry: string;

  @ApiProperty()
  @IsString()
  locationPostcode: string;

  @ApiProperty()
  @IsString()
  locationCoordinatesLatitude: string;

  @ApiProperty()
  @IsString()
  locationCoordinatesLongitude: string;

  @ApiProperty()
  @IsString()
  locationTimezoneOffset: string;

  @ApiProperty()
  @IsString()
  locationTimezoneDescription: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  loginUsername: string;

  @ApiProperty()
  @IsString()
  loginPassword: string;

  @ApiProperty()
  @IsString()
  loginSalt: string;

  @ApiProperty()
  @IsHash('md5')
  logiMd5: string;

  @ApiProperty()
  @IsHash('sha1')
  loginSha1: string;

  @ApiProperty()
  @IsHash('sha256')
  loginSha256: string;

  @ApiProperty()
  @IsDate()
  dobDate: Date;

  @ApiProperty()
  @IsNumber()
  dobAge: number;

  @ApiProperty()
  @IsDate()
  registeredDate: Date;

  @ApiProperty()
  @IsNumber()
  registeredAge: number;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  cell: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  idName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  idValue: string;

  @ApiProperty()
  @IsString()
  pictureLarge: string;

  @ApiProperty()
  @IsString()
  pictureMedium: string;

  @ApiProperty()
  @IsString()
  pictureThumbnail: string;

  @ApiProperty()
  @IsString()
  nat: string;

  @ApiProperty()
  @IsDate()
  imported_t: Date;

  @ApiProperty()
  @IsString()
  status: Status;
}
