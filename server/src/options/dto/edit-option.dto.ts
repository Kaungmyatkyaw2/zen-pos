import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class EditOptionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  max: number;

  @IsString()
  @IsNotEmpty()
  min: number;

  @IsBoolean()
  @IsNotEmpty()
  isRequired: boolean;
}
