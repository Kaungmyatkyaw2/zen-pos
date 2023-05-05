import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateOptionDto {
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

  @IsArray()
  @IsNotEmpty()
  choices: { name: string; price: number }[];
}
