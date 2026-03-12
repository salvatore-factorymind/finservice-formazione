export interface User {
  id: number;
  surname: string;
  name: string;
  role: string;
  dateBirth: Date;
  contract: ContractType;
}

export enum ContractType {
  FixedTerm,
  Permanent,
  Intern
}