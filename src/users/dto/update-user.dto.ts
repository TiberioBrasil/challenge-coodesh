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

export class UpdateUserDto {
  @ApiProperty({
    description: 'User UUID',
  })
  @IsUUID()
  loginUuid: string;

  @ApiProperty({
    description: 'User gender',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'User name title',
  })
  @IsString()
  nameTitle: string;

  @ApiProperty({
    description: 'User firstname',
  })
  @IsString()
  nameFirst: string;

  @ApiProperty({
    description: 'User lastname',
  })
  @IsString()
  nameLast: string;

  @ApiProperty({
    description: 'User street number',
    type: Number,
  })
  @IsNumber()
  locationStreetNumber: number;

  @ApiProperty({
    description: 'User street name',
  })
  @IsString()
  locationStreetName: string;

  @ApiProperty({
    description: 'User city',
  })
  @IsString()
  locationCity: string;

  @ApiProperty({
    description: 'User state',
  })
  @IsString()
  locationState: string;

  @ApiProperty({
    description: 'User country',
  })
  @IsString()
  locationCountry: string;

  @ApiProperty({
    description: 'User postcode',
  })
  @IsString()
  locationPostcode: string;

  @ApiProperty({
    description: 'User coordinates latitude',
  })
  @IsString()
  locationCoordinatesLatitude: string;

  @ApiProperty({
    description: 'User coordinates longitude',
  })
  @IsString()
  locationCoordinatesLongitude: string;

  @ApiProperty({
    description: 'User timezone offset',
  })
  @IsString()
  locationTimezoneOffset: string;

  @ApiProperty({
    description: 'User timezone description',
  })
  @IsString()
  locationTimezoneDescription: string;

  @ApiProperty({
    description: 'User email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User description',
  })
  @IsString()
  loginUsername: string;

  @ApiProperty({
    description: 'User hashed password',
  })
  @IsString()
  loginPassword: string;

  @ApiProperty({
    description: 'User password salt',
  })
  @IsString()
  loginSalt: string;

  @ApiProperty({
    description: 'User login md5 hash',
  })
  @IsHash('md5')
  loginMd5: string;

  @ApiProperty({
    description: 'User login sha1 hash',
  })
  @IsHash('sha1')
  loginSha1: string;

  @ApiProperty({
    description: 'User login sha256 hash',
  })
  @IsHash('sha256')
  loginSha256: string;

  @ApiProperty({
    description: 'User date of birth',
    type: Date,
  })
  @IsDate()
  dobDate: Date;

  @ApiProperty({
    description: 'User age',
    type: Number,
  })
  @IsNumber()
  dobAge: number;

  @ApiProperty({
    description: 'User register date',
    type: Date,
  })
  @IsDate()
  registeredDate: Date;

  @ApiProperty({
    description: 'User register age',
    type: Number,
  })
  @IsNumber()
  registeredAge: number;

  @ApiProperty({
    description: 'User phone',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'User cell',
  })
  @IsString()
  cell: string;

  @ApiProperty({
    description: 'User id name',
  })
  @IsString()
  @IsOptional()
  idName: string;

  @ApiProperty({
    description: 'User id value',
  })
  @IsString()
  @IsOptional()
  idValue: string;

  @ApiProperty({
    description: 'User picture large url',
  })
  @IsString()
  pictureLarge: string;

  @ApiProperty({
    description: 'User picture medium url',
  })
  @IsString()
  pictureMedium: string;

  @ApiProperty({
    description: 'User picture thumb url',
  })
  @IsString()
  pictureThumbnail: string;

  @ApiProperty({
    description: 'User Network Address Translation',
  })
  @IsString()
  nat: string;

  @ApiProperty({
    description: 'Datetime when the user was imported',
    type: Date,
  })
  @IsDate()
  imported_t: Date;

  @ApiProperty({
    description: 'User status',
  })
  @IsString()
  status: Status;
}
