import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditMenuItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  discount: string;

  @IsString()
  @IsOptional()
  categoryId: string;

  @IsString()
  @IsOptional()
  toConnect: string;

  @IsString()
  @IsOptional()
  toDisconnect: string;

  @IsString()
  @IsOptional()
  isAvailable: string;

  @IsString()
  @IsOptional()
  image_public_id: string;

  @IsString()
  @IsOptional()
  image_url: string;
}
