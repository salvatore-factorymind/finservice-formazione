export interface Project {
  id: number;
  name: string;
  description: string;
  dateStart: Date;
  dateFinish: Date;
  type: ProjectType;
}

export enum ProjectType{
  Web_app,
  Mobile_app,
  Ecommerce
}