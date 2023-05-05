import { company, user } from '@prisma/client';

export interface UserType extends user {
  company: company;
}
