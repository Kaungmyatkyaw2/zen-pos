import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsNumber()
  tax_rate: number;

  @IsNotEmpty()
  @IsNumber()
  charge_rate: number;
}
