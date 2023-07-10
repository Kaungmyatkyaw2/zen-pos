import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateChoiceDto } from './dto';

@Injectable()
export class ChoicesService {
  constructor(private prisma: PrismaService) {}

  async getChoices(options_id: number) {
    const choices = await this.prisma.choices.findMany({
      where: {
        options_id,
      },
    });

    return choices;
  }

  async createChoice(options_id: number, dto: CreateChoiceDto[]) {
    const choices = await this.prisma.$transaction(
      dto.map((choice) =>
        this.prisma.choices.create({
          data: {
            ...choice,
            isAvailable: true,
            options_id: options_id,
          },
        }),
      ),
    );

    return choices;
  }

  async updateChoice(choice_id: number, dto: CreateChoiceDto) {
    const choices = await this.prisma.choices.update({
      where: {
        id: choice_id,
      },
      data: {
        ...dto,
      },
    });

    return choices;
  }

  async toggleChoice(choice_id: number, dto: { available: boolean }) {
    const choices = await this.prisma.choices.update({
      where: {
        id: choice_id,
      },
      data: {
        isAvailable: dto.available,
      },
    });

    return choices;
  }

  async deleteChoice(id: number) {
    const delChoice = await this.prisma.choices.deleteMany({
      where: {
        id: +id,
      },
    });

    return delChoice;
  }
}
