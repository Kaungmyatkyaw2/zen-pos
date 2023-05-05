import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChoiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
