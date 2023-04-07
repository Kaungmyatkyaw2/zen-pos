import { Company } from "./Company.types";

export interface User {
  id: string;
  name: string;
  email: string;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
}
