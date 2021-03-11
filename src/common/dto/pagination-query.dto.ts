import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  take: number;
}
