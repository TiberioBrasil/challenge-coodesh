import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Status } from '../enum/status.enum';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  loginUuid: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  nameTitle: string;

  @Column({ nullable: false })
  nameFirst: string;

  @Column({ nullable: false })
  nameLast: string;

  @Column({ nullable: false })
  locationStreetNumber: number;

  @Column({ nullable: false })
  locationStreetName: string;

  @Column({ nullable: false })
  locationCity: string;

  @Column({ nullable: false })
  locationState: string;

  @Column({ nullable: false })
  locationCountry: string;

  @Column({ nullable: false })
  locationPostcode: string;

  @Column({ nullable: false })
  locationCoordinatesLatitude: string;

  @Column({ nullable: false })
  locationCoordinatesLongitude: string;

  @Column({ nullable: false })
  locationTimezoneOffset: string;

  @Column({ nullable: false })
  locationTimezoneDescription: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  loginUsername: string;

  @Column({ nullable: false })
  loginPassword: string;

  @Column({ nullable: false })
  loginSalt: string;

  @Column({ nullable: false })
  logiMd5: string;

  @Column({ nullable: false })
  loginSha1: string;

  @Column({ nullable: false })
  loginSha256: string;

  @Column({ nullable: false })
  dobDate: Date;

  @Column({ nullable: false })
  dobAge: number;

  @Column({ nullable: false })
  registeredDate: Date;

  @Column({ nullable: false })
  registeredAge: number;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  cell: string;

  @Column({ nullable: true, default: null })
  idName: string;

  @Column({ nullable: true, default: null })
  idValue: string;

  @Column({ nullable: false })
  pictureLarge: string;

  @Column({ nullable: false })
  pictureMedium: string;

  @Column({ nullable: false })
  pictureThumbnail: string;

  @Column({ nullable: false })
  nat: string;

  @Column({ nullable: false })
  imported_t: Date;

  @Column({ nullable: false, default: 'draft' })
  status: Status;
}
