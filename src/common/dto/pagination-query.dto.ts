import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Number of results to skip',
    minimum: 0,
    default: 0,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip: number;

  @ApiProperty({
    description: 'Number of results to take',
    minimum: 1,
    maximum: 100,
    default: 100,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  take: number;
}
