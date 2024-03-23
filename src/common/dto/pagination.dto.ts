import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  //@IsInt()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit?: number;

  //@IsInt()
  @IsNumber()
  @IsPositive()
  @Min(0)
  offset?: number;
}
