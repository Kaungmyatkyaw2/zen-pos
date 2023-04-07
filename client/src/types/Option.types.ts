export interface Option {
  id: number;
  name: string;
  isRequired: boolean;
  min: number;
  max: number;
  companyId: string;
  choices: Choice[];
}

export interface Choice {
  id: number;
  name: string;
  price: number;
  options_id: number;
  isAvailable: boolean;
}
