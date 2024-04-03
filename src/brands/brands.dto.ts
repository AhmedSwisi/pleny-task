import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class BrandEditDto {
  @IsNotEmpty()
  @IsString()
  brandName: string;

  @Transform(({ value, obj }) => obj.yearCreated && !value ? parseInt(obj.yearCreated) : parseInt(value) || 1600)
  @Type(() => Number)
  @IsInt()
  @Min(1600)
  yearFounded: number;

  @IsNotEmpty()
  @IsString()
  headquarters: string;

  @Transform(({ value }) => parseInt(value) || 1)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  numberOfLocations: number;
}
