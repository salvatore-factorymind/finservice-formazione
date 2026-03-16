export interface User {
  id: number;
  surname: string;
  name: string;
  role: string;
  dateBirth: Date;
  contract: ContractType;
  sex: SexType;
}

export enum ContractType {
  FixedTerm,
  Permanent,
  Intern
}

export enum SexType{
  male,
  female
}