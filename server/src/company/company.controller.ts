import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserType } from '../auth/types';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(JwtGuard)
  @Patch('update')
  updateCompany(@GetUser() user: UserType, @Body() dto: UpdateCompanyDto) {
    return this.companyService.updateCompany(user.company.id, dto);
  }

  @Get()
  getCompany(@Query('id') company_id: string) {
    return this.companyService.getCompany(company_id);
  }

  @Get('getCompanies')
  getComapnies() {
    return this.companyService.getCompanies();
  }
}
