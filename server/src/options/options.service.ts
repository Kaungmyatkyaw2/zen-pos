import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOptionDto, EditOptionDto } from './dto';

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) {}

  async getOptions(companyId: string) {
    const getOptions = await this.prisma.options.findMany({
      where: {
        companyId: companyId,
      },
      include: {
        choices: true,
      },
    });

    return getOptions;
  }

  async createOption(companyId: string, dto: CreateOptionDto) {
    const choices = dto.choices.map((i) => ({
      name: i.name,
      price: i.price,
    }));

    const createdOption = await this.prisma.options.create({
      data: {
        isRequired: dto.isRequired,
        max: +dto.max,
        min: +dto.min,
        name: dto.name,
        companyId: companyId,
        choices: {
          createMany: {
            data: choices,
          },
        },
      },
      include: {
        choices: true,
      },
    });

    return createdOption;
  }

  async updateOption(optionId: number, dto: EditOptionDto) {
    const updatedOption = await this.prisma.options.update({
      data: {
        isRequired: dto.isRequired,
        max: +dto.max,
        min: +dto.min,
        name: dto.name,
      },
      include: {
        choices: true,
      },
      where: {
        id: optionId,
      },
    });

    return updatedOption;
  }

  async deleteOption(companyId: string, optionId: number) {
    const delOption = await this.prisma.options.deleteMany({
      where: {
        id: optionId,
        companyId: companyId,
      },
    });

    return delOption;
  }
}
